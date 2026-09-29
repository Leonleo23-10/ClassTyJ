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
    const pixeles1 = imageData.data;
    const pixeles2 = imageData2.data;

    const width = imageData.width;
    const S = width * 4;

    const tolerance = 45;
    let diferencias = 0;
    let min_col = S;
    let max_col = 0;
    let first_idx = -1;
    let last_idx = -1;

    for (let i = 0; i < pixeles1.length; i += 4) {
        if (Math.abs(pixeles1[i] - pixeles2[i]) > tolerance) {
            if (i + 4 < pixeles1.length && Math.abs(pixeles1[i + 4] - pixeles2[i + 4]) > tolerance) {
                diferencias++;

                let col = i % S;
                if (col < min_col) min_col = col;
                if (col > max_col) max_col = col;

                if (first_idx === -1) {
                    first_idx = i;
                }
                last_idx = i;
            }
        }
    }

    const totalPixeles = pixeles1.length / 4;
    const hayMovimiento = diferencias > (totalPixeles * 0.02);

    if (hayMovimiento && first_idx !== -1) {
        let fila_superior = first_idx - (first_idx % S);
        let fila_inferior = last_idx - (last_idx % S);

        for (let c = min_col; c <= max_col; c += 4) {
            let idx_sup = fila_superior + c;
            let idx_inf = fila_inferior + c;

            pixeles1[idx_sup] = 255;
            pixeles1[idx_sup + 1] = 0;
            pixeles1[idx_sup + 2] = 0;
            pixeles1[idx_sup + 3] = 255;

            pixeles1[idx_inf] = 255;
            pixeles1[idx_inf + 1] = 0;
            pixeles1[idx_inf + 2] = 0;
            pixeles1[idx_inf + 3] = 255;
        }

        for (let f = fila_superior; f <= fila_inferior; f += S) {
            let idx_izq = f + min_col;
            let idx_der = f + max_col;

            pixeles1[idx_izq] = 255;
            pixeles1[idx_izq + 1] = 0;
            pixeles1[idx_izq + 2] = 0;
            pixeles1[idx_izq + 3] = 255;

            pixeles1[idx_der] = 255;
            pixeles1[idx_der + 1] = 0;
            pixeles1[idx_der + 2] = 0;
            pixeles1[idx_der + 3] = 255;
        }
    }

    return hayMovimiento;
}
