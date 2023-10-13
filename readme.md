## Anotações

 Estamos usando a lib **autocannon** para realizarmos nosso teste de carga, simulando requests


 >*Sobre o Autocannon* 
   - utilizamos a flag `-c` para informarmos quantos usuários queremos
      - ex: `-c 500` -> 500 usuários
   - utilizamos a flag `-d` para informarmos a duração do teste.
      - ex: `-d 30` -> 30 segundos
   - a flag `--workers` serve para informarmos quantas threds o nodejs irá criar para gerenciar essas requisições
      - ex: `--workers 10` -> 10 threds
   - já as flags `--renderStatusCodes` e `--latency` são apenas informativas e elas retornaram algumas informações. A primeira flag nos retorna os `statusCodes` que foram recebidos nas requisições, já a segunda flag nos da um relatório completo sobre a `latencia da aplicação`
   - para aquecermos nossa aplicação antes de iniciarmos o teste de carga real utilizamos a seguinte flag `--warmap`. E com ela podemos informar o *numero de usuários* e o *tempo* desse aquecimento.
      - ex: `--warmup [-c 1 -d 2]` -> começará com *1 usuário* e testará por *2 segundos*

   OBS: para mostrar algumas outras informações, vc pode utilizar a flag `--debug` e elá nos mostrará algumas outras infos

> Sobre o cluster

   Usando o modulo cluster dentre suar multiplas funcionalidade, é possivel gerenciar e balancear a carga da nossa api.

   Usando as funções `.isPrimary(...)` e `isWorker` é possivel saber se ele é `primary` ou `worker`.
   
   Mas oq o primary tem de diferente do worker?
   - O primary é que vai balancear a carga
   - Já o worker é quem realmente vai trabalhar

