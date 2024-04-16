/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColorFromString = (text: string) => {
    const colors = [
      "#ff6ea1",
      "#75ff7a",
      "#69fffb",
      "#66d6ff",
      "#14fadb",
      "#6495de",
      "#d35cdb",
      "#ff69c0",
      "#ffa585",
      "#eb7fb3",
      "#85ff9e"      
    ];
  
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
  
    return colors[hash];
  };