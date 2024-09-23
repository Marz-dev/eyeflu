function lerp(A,B,t){
    return A+(B-A)*t;
}
function detectCols(nx, ny, radius){
    /*
    return rx < x + radius &&   
    rx + rw > x &&   
    ry < y + radius&&
    ry + rh> y - radius; 

    Rect Collision For Tests
    */
    if(Math.sqrt(nx*nx + ny*ny) <= radius){
        return true;
    }
    return false;
 }