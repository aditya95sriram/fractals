import { Complex } from "../modules/complex";
import { Polynomial } from "../modules/polynomial";


const colors = ["red", "green", "blue", "yellow", "magenta", "cyan"];


export function iterate(p: Polynomial, z: Complex, num_iter: number): Complex {
    const dp = p.differentiate();
    for (let i = 0; i < num_iter; i++) {
        const step = p.subsitute(z).div(dp.subsitute(z));
        z = z.sub(step);
    }
    return z;
}

export function closest_root(z: Complex, roots: Complex[]): number {
    let min_dist = Infinity;
    let closest_idx = 0;  // placeholder closest value
    for (let root_idx = 0; root_idx < roots.length; root_idx++) {
        const root = roots[root_idx];
        const dist = z.dist(root);
        if (dist < min_dist) {
            min_dist = dist;
            closest_idx = root_idx;
        }
    }
    return closest_idx;
}

export function colorPoint(p: Polynomial, roots: Complex[], z: Complex, num_iter: number): string {
    const result = iterate(p, z, num_iter);
    const color_idx = closest_root(result, roots);
    return colors[color_idx];
}
