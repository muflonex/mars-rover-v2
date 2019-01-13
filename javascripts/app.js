//  Se trata de un programa que realiza el movimiento de un robot en el terreno de Marte
//  El terreno esta representado por una mátriz que lleva 10 lineas cada una con 10 columnas

/*
  [0,0],[0,1],[0,2]...
  [1,0],...
  [2,0],...

*/
window.onload = () => {
//=====EXECUTING MISSION======
//-----Creating an instance of Rover
let mars = new Planet()
let marsMission = new Mission(mars)
marsMission.scanDestination()
document.getElementById("mars").onclick = prepareLanding(mars)
// rover.executeCommands();
// rover.printRoute();
}
