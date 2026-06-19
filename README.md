user:
1.  for recipe (get, post, update, delete)
2. like (post, get)


// for meta date 

export const generateMetadata = async({ params }) => {
    //console.log(params, "params detail page!");
    const { id } = await params;
    //console.log(params, "Farid news details page!");
    //console.log("news id: ", id);
    const news = await getNewDetailsByID(id);
    //console.log(news, "Farid Akanda");
    return {
        title: news.title,
        description: news.details
    };
};
