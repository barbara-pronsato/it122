let art =  [
{title: "Sunset", type: "sculpture", price: 5000, media: "Bronze", artist_name: "Tilden Swayze", id: 0}, 
{title: "Burst", type: "painting", price: 900, media: "Acrylic Canvas", artist_name: "Savannah Georgia", id: 1},
{title: "Walk", type: "photography", price: 100, media: "Gelatin Silver", artist_name: "Eric Fromm", id: 2},
{title: "Bridge Too Far", type: "collage", price: 100, media: "Multi Media", artist_name: "Brian Ferry", id: 3},
{title: "Yellow Scream", type: "illustration", price: 300, media: "Ink Paper", artist_name: "Solange Cherry", id: 4}
];

exports.getAll = () => {
    return art;
};

exports.getDetail = id => {
    const artItem = art.find(art => art.id === id);
    if (artItem === undefined) {
        return {"details": false, "msg": `Artwork with ID "${id}" not found`}
    } else {
    return artItem;
    }
};

exports.getItem = id => {
  const artItem = art.find(art => art.id === id);
  if (artItem === undefined) {
      return ({
        status: 'failure', 
        message: 'Artwork with ID ' + id + ' not found'
       })
      }    
  else {
    return ({
      status: 'success', 
      data: artItem
      });
    }
}

exports.addItem = newItem => {
  if (newItem.title === undefined) {
    return({
      status: 'failure',
      message: 'all art items must have a title'
    })
  }
  else {
    art.push(newItem);
    return({
      status: 'success',
      message: newItem.title + " added to the list of art items"
    })
  }
};


exports.deleteItem = id => {
  const artItem = art.find(art => art.id === id);
  if (artItem === undefined) {
      return ({
        status: 'failure', 
        message: 'Artwork with ID ' + id + ' not found to delete'
       })
      }    
  else {
    const artToRemove = art.map(function(e) { return e.id; }).indexOf(id);
    console.log(art[artToRemove])
    art.splice(artToRemove, 1) 
    console.log(art)
    return ({
      status: 'success', 
      message: 'item with ID ' + id + ' removed'
    });
  }
};