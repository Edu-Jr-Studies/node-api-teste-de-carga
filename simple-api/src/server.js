import http from 'http';
const processId = process.pid;
import { pipeline, Readable, Writable, Transform } from 'stream';
import { promisify } from 'util';
import { randomUUID } from 'crypto';

const server = http.createServer(async (req, res) => {
    // for(let i = 0; i < 1e4; i++);
    const result = await calcBigData();
    res.end(`handled by pid: ${processId},\nresult: ${result} \n`)
});

server.listen(3000, () => console.log('Server is running... processId:', processId))

// Aguardando as conexões serem encerradas para encerrar o programa
process.on('SIGTERM', () => {
    console.log('server ending', new Date().toISOString());
    server.close(() => process.exit())
})


async function calcBigData() {
    const asyncPipeline = promisify(pipeline);
    let countData = 0;
  
    const readableStream = new Readable({
      read() {
        for(let i = 0; i < 1e5; i++){ // 1e2 = 100000
          const newData = {
            id: i,
            randomID: randomUUID(),
            value: Math.floor(Math.random()  * (1e4 - 0) + 0) // 1e4 = 10000
          }
  
          const data = JSON.stringify(newData);
          this.push(data);
        }
            
        this.push(null)
      }
    });
  
    const transformStream = new Transform({
      transform(chunk, enc, cb){
        const data = JSON.parse(chunk);
        const newData = {
          ...data,
          valueType: (data.value % 2 == 0) ? 'par' : 'impar',
        }
        
        const result = JSON.stringify(newData);
        cb(null, result);
      }  
    });
  
    const writableStream = new Writable({
      write(chunk, enc, cb){
        countData = countData + 1;
        // console.log(JSON.parse(chunk));
        
        cb();
      }
    })
  
    await asyncPipeline(
      readableStream,
      transformStream,
      writableStream
    );
  
    return `dados calculados: ${countData}`;
  }