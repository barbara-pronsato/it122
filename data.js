let art =  [
{type: "sculpture", price: 1000, media: "bronze", artist_name: "Tilden_Swayze"}, 
{type: "painting", price: 1000, media: "acrylic_canvas", artist_name: "Savannah_Georgia"},
{type: "photography", price: 1000, media: "gelatin_silver", artist_name: "Eric_Fromm"},
{type: "collage", price: 1000, media: "multi_media", artist_name: "Brian_Ferry"},
{type: "illustration", price: 1000, media: "ink_paper", artist_name: "Solange_Cherry"}
];

exports.getAll = () => {
    return art;
};
