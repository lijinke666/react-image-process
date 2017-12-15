export const createModeName = (mode=[])=> (target,name,descriptor)=>{
    
    const MODE = mode.reduce((o,next)=>{
        o[next] = next
        return o
    },{})
    target.prototype._MODE_ = MODE
    return target
}
