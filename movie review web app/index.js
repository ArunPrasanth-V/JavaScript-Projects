const autocompleteconfig={
  renderOpeation(movie){
    const imgSrc=(movie.Poster ==='N/A')?'':movie.Poster;
   return  `
    <img src="${imgSrc}"/>
    ${movie. Title} (${movie. Year})`;
},
inputValue(movie){
 return movie.Title;
},
async fetchData(searchTerm){
  const response = await axios.get('http://www.omdbapi.com/',{
      params:{
         apikey:'dae5441f', 
         s:searchTerm
      }
  });
   if(response.data.Error){
       return [];
   }
  return response. data.Search; 
}
}

autocomplete({
    ...autocompleteconfig,
    root:document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
      document.querySelector('.tutorial').classList.add('is-hidden');
      onMovieSelect(movie, document.querySelector('#left-summary'));
    } 
});
autocomplete({
  ...autocompleteconfig,
  root:document.querySelector('#right-autocomplete'),
  onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'));
    
  }
   
});

const onMovieSelect =async (movie,summaryElement) =>{
  const response =await axios.get('http://www.omdbapi.com/',{
   params:{
      apikey:'dae5441f', 
      i:movie.imdbID
   }
});
summaryElement.innerHTML=movieTemplate(response.data);
};

const movieTemplate =(movieDetail) =>{
    return `<article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}" alt="">
      </p>
    </figure>
    <div class="constent">
     <h1>${movieDetail.Title}</h1>
     <h4>${movieDetail.Genre}</h4>
     <p>${movieDetail.Plot}</p>
    </div>
  </article>
  
  <article class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
 </article>
 <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">BoxOffice</p>
 </article>
 <article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
 </article>
 <article class="notification is-primary">
  <p class="title">${movieDetail.imdbRatig}</p>
  <p class="subtitle">IMDB Ratig</p>
 </article>
 <article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMDB Votes</p>
 </article>
`;
}
