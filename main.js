/* Passos:

criamos a tela
Acessamos a webcam
desenhamos a visualização da webcam na tela
inicializamos o poseNet
Executamos o poseNet
Obter as coordenadas x e y do nariz
desenhar um círculo no nariz
fazer download do nariz de palhalo e 
carregar a imagem no servidor
*/

noseX=0;
noseY=0;

function preload() { // Então dentro da função preload(), carregue a imagem do nariz de palhaço usando o link gerado no postimg, e armazene dentro de uma variável.
  clownNose = loadImage('https://i.postimg.cc/7ZBcjDqp/clownnose.png'); //- clownNose é a variável na qual armazenaremos a imagem carregada.
  // é uma função p5.js predefinida usada para carregar a imagem.
}

function setup() { //primeiro vamos escrever o código para acessar a webcam, esse código virá dentro da função setup()
  canvas = createCanvas(300, 300); /*Lembre-se de que canvas é um elemento GUI (Interface Gráfica do Usuário) e
  estamos armazenando-a dentro de uma variável, pois assim podemos usar a notação de
  ponto e manipular o elemento canvas.*/
  canvas.center();
  video = createCapture(VIDEO); //● createCapture() é a função que ajuda a acessar a webcam. E temos que passar VIDEO dentro da função createCapture().
  video.size(300, 300); /*● Também vamos dar tamanho a este vídeo, pois estamos usando poseNet, precisamos ser
  muito precisos com as dimensões do vídeo na tela. Então vamos usar a função size(),
  que é uma função predefinida do p5.js para dar tamanho a essa visualização da webcam.
*/  
  video.hide(); //E então ocultamos o componente extra criado pelo p5.js para visualização da webcam

  poseNet = ml5.poseNet(video, modelLoaded); /*Primeiro vamos definir a variável, Depois vamos escrever o nome da biblioteca ml5.js,  
  poseNet é uma função predefinida de ml5.js usada para inicializar o modelo(Isso iniciará a função poseNet) 
  
   O 1º é a entrada (significa a imagem OU o vídeo no qual queremos que a
poseNet execute ações) no nosso caso temos a visualização da webcam

  O 2º é a função para confirmar que o poseNet foi inicializado*/
 
  
  poseNet.on('pose', gotPoses); 
  /*Então, primeiro vamos escrever a variável que está armazenando a inicialização do
posnet, que é:
● Em seguida, vamos escrever a função on(), que é uma função predefinida de ml5.js
usada para iniciar a execução do poseNet: podeNet.on()
● Então, dentro deles, precisamos passar 2 parâmetros:
○ Precisamos obter a pose (coordenadas x e y das 17 partes que discutimos na aula
anterior).
○ Portanto, no 1º parâmetro, por padrão, escreveremos pose entre aspas simples.
○ No 2º parâmetro, escrevemos a função que obterá todas as poses (coordenadas x
e y das 17 partes que discutimos na aula anterior) do modelo.*/
}

function modelLoaded() {
  console.log('PoseNet foi inicializado');
}

function gotPoses(results)
/*E dentro da função gotPoses() escrevemos os resultados.
■ Os resultados contêm as coordenadas x e y de todas as 17 partes do corpo.
Vamos escrever nosso código dentro de uma condição if.*/
{
  if(results.length > 0)
  /*Então, primeiro vamos definir uma condição if dentro da função gotPoses(), que
verificará se o comprimento dos resultados é maior que 0 e só vai na condição if, que
significa - Se os resultados estiverem vazios, nada acontecerá.

● O objetivo de escrever esta condição if é que, se alguma das situações mencionadas
abaixo ocorrer, nosso código não fará nada, portanto, evitará que nosso aplicativo web
gere erros e interrompa o processo de poseNet.
Situações:
○ A webcam não inicia por algum motivo.
○ Ou não houver ninguém na frente da webcam, o que significa que o poseNet não
poderá detectar ninguém.
○ Ou se poseNet começar antes da webcam, o que também resultará no mesmo que
o poseNet não conseguir detectar ninguém.
○ Ou se houver outros erro*/
  {
    console.log(results);
    noseX = results[0].pose.nose.x-15; //Ao abrir o consol, o código vai estar: dentro de results -> índice 0 -> pose -> nose -> coordenada x

    noseY = results[0].pose.nose.y-15; //O código vai estar: dentro de results -> índice 0 -> pose -> nose -> coordenada y
  }
}
/*removemos o código de desenhar um círculo, porque adicionamos o código para colocar nariz de palhaço no nosso nariz. 
Teria q passar pra -5 as coordenadas com a função circle.*/

function draw() { //Função predefinida de p5 para carregar uma imagem na tela
  image(video, 0, 0, 300, 300);
  image(clownNose, noseX, noseY, 30, 30); 
  //fill(255,0,0);
  //stroke(255,0,0);
  //circle(noseX, noseY, 20);
  //image(clownNose, noseX, noseY, 30, 30); // clownNose contém a URL da imagem do nariz de palhaço.
}

function takeSnapshot(){    //Dentro da função save() temos que escrever o nome no qual queremos salvar o arquivo.

  save('myFilterImage.png');
}

/*stroke = é usado para dar a cor da borda, dentro do preenchimento precisamos
passar o valor rgb para a cor que queremos. Passamos 255, 0, 0, porque 255, 0, 0 é o
valor rgb para a cor vermelha. Você pode dar qualquer valor de cor rgb.


Por que não podemos usar diretamente a URL da imagem do google?
R - Porque em p5.js às vezes acontece que quando copiamos a URL de qualquer imagem da
pesquisa de imagens do google e tentamos usá-la em nosso p5.js ele não nos permite usá-la por
motivos de segurança e também as URLs das imagens da pesquisa do google são muito longas. Criamos um link no site, pq p5 não aceita 
fotos do pc.

Por que não podemos baixar a imagem em nosso sistema e usá-la em vez de carregar
essa imagem no servidor e depois usá-la?
R - p5.js não permite usar imagens do localStorage devido a problemas de segurança.
Embora seja sempre recomendado ter todas as suas imagens/ativos do seu site dentro de uma pasta,
muitos sites usam imagens diretamente via url em vez de manter um arquivo da imagem dentro da
pasta.

*/