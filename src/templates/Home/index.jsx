import './styles.css';

import { Component } from 'react';

import { Posts } from '../../components/Posts'
import { loadPost } from '../../utis/loadPost' 
import { Button } from '../../components/Button';
import { Input } from '../../components/TextInput';
export class Home extends Component {
  state= {
    posts:[],
    allPosts:[],
    page:0,
    postsPerPage:3,
    searchValue: '',
  };
  async componentDidMount(){
    await this.loadPost();
  
  }

  loadPost = async()=>{
    const { page, postsPerPage} = this.state
    const postsAndPhotos = await loadPost();
    this.setState({
      posts:postsAndPhotos.slice(page,postsPerPage),
      allPosts: postsAndPhotos,
    })
  } 

  loadMorePost =()=>{
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
 
    const nextPage = page+postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage+postsPerPage)
    posts.push(...nextPosts)
    this.setState({posts, page:nextPage })
  }

  handleChange= (e)=>{
    const {value} = e.target
    this.setState({searchValue:value});

  }
  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePost = page + postsPerPage >= allPosts
   
    const filterPost = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase()
       .includes(searchValue.toLowerCase());
    })
    : posts;

    return (
      <>
      <section className='container'>

        <div className='searchContainer'>
        {!!searchValue && (
          <h2> value : {searchValue}</h2>
        )

        }
    <Input value searchValue={searchValue} handleChange={this.handleChange} />
        </div>
     
      {filterPost.length>0 && (
        <Posts posts={filterPost} />
      )}

      {(filterPost.length ===0 && (
        <p>Não exite post</p>
      ))}
      <div className='buttonContainer'>
        {!searchValue && (
          <Button onClick={this.loadMorePost}  
          disabled={noMorePost}
          >Adicionar</Button>
        )

        }
      </div>
      </section>
    

      </>
    );
  }
}


