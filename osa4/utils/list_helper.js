const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a,b) => {return a + b.likes}, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

const mostBlogs = (blogs) => {
  const mBlogs = blogStats(blogs).reduce((a,b) => a.blogs > b.blogs ? a : b)
  delete mBlogs.likes
  return mBlogs
}

const mostLikes = (blogs) => {
  const mLikes = blogStats(blogs).reduce((a,b) => a.likes > b.likes ? a : b)
  delete mLikes.blogs
  return mLikes
}

/* Palautetaan listana blogeista tiedot per author muodossa
   {author: string, blogs: int, likes: int}
*/
const blogStats = (blogs) => {
  /* Apufunktio return funktiolle, a on lista jo löydetyistä authoreista ja b käsittelyssä oleva blogikirjaus tietokannasta */
  const logAndReturn = (a, b) => {
    const index = a.findIndex( ({ author }) => author === b.author)
    a[index].likes += b.likes
    a[index].blogs += 1
    return a
  }

  const returnValue = 
    blogs.reduce((a, b) => {return a.some(blog => blog['author'] === b.author) /* Onko author jo palautettavassa listassa */
      ? logAndReturn(a, b)                                                     /* Jos on, niin viedään käsittelyssä oleva elementti sekä luotu lista apufunktiolle */
      : a.concat({'author': b.author, 'blogs' : 1, 'likes' : b.likes})}, [])   /* Muussa tapauksessa luodaan palautettavaan listaan uusi alkio */

  return returnValue
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}
