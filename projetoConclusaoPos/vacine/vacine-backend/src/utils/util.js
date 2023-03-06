function putEscapeCaracEsp (str){
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
}

module.exports = {putEscapeCaracEsp};