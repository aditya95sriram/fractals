"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorPoint = exports.closest_root = exports.iterate = void 0;
const colors = ["red", "green", "blue", "yellow", "magenta", "cyan"];
function iterate(p, z, num_iter) {
    const dp = p.differentiate();
    for (let i = 0; i < num_iter; i++) {
        const step = p.subsitute(z).div(dp.subsitute(z));
        z = z.sub(step);
    }
    return z;
}
exports.iterate = iterate;
function closest_root(z, roots) {
    let min_dist = Infinity;
    let closest_idx = 0; // placeholder closest value
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
exports.closest_root = closest_root;
function colorPoint(p, roots, z, num_iter) {
    const result = iterate(p, z, num_iter);
    const color_idx = closest_root(result, roots);
    return colors[color_idx];
}
exports.colorPoint = colorPoint;
