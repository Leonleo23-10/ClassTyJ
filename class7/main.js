/*
1.Importar funcion de suscripcion
2.console log de cada que llegue un nuevo bloque
*/
import { desuscribir, suscribir } from "./blockchainservide.js";
const blocksContainer = document.getElementById("blocks-container");
function saludar(infoBloque) {
    console.log(infoBloque);
    const fecha = infoBloque.timestamp.toLocaleDateString("es-MX");
    const hora = infoBloque.timestamp.toLocaleTimeString("es-MX");
    const htmlBloque = `
        <article class="block-card">
            <div class="card-topline">
                <span class="card-label">BLOQUE</span>
                <span class="block-indicator"></span>
            </div>
            <h3>${infoBloque.number}</h3>
            <div class="block-details">
                <p><span>Gas utilizado</span><strong>${infoBloque.gasUsed.toLocaleString("es-MX")}</strong></p>
                <p><span>Fecha</span><strong>${fecha}</strong></p>
                <p><span>Hora</span><strong>${hora}</strong></p>
            </div>
        </article>
    `;
    blocksContainer.insertAdjacentHTML("afterbegin", htmlBloque);
    /*
    1.quiero que imprima un mensaje cada que llegue un nuevo bloque
    2. por cada bloque nuevo conformar una platilla con la informacion del bloque y agregarla al div de bloques
    3,poner e console el bloque nuevo
    */
}
suscribir(saludar) ;
document.getElementById("desuscribir").addEventListener("click", function() {
    console.log("desuscribiendo");
    desuscribir(saludar);
})