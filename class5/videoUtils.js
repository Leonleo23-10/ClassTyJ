/**
 * Convierte una imagen a escala de grises
 * @param {ImageData} imageData 
 */
export function convertirAGreyScale(imageData) {
    const pixeles = imageData.data

    /* 
    Formula de conversion de RGB a escala de grises
        (r * 0.299) + (g * 0.587) + (b * 0.114)
    */
    for(let i = 0; i < pixeles.length; i += 4) {
        const luma = (pixeles[i] * 0.299)
        + (pixeles[i + 1] * 0.587)
        + (pixeles[i + 2] * 0.114)

        pixeles[i] = luma
        pixeles[i + 1] = luma
        pixeles[i + 2] = luma
    }
}

export function compararImagenes(imageData, imageData2) {
    const pixeles1 = imageData.data
    const pixeles2 = imageData2.data

    const tolerance = 10;
    let diferencias = 0; 

    for (let i = 0; i < pixeles1.length; i += 4) {
        
        if (Math.abs(pixeles1[i] - pixeles2[i]) > tolerance) {
            diferencias++;
        }  
    }

    const totalPixeles = pixeles1.length / 4;
    return diferencias > (totalPixeles * 0.10);
}
