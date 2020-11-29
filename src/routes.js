import Account from './containers/Home/Myaccount/Account'
import Movies from './containers/Home/Mymovies/Movies'
import Search from './containers/Home/Searchmovies/Search'

const appRoutes = [
  {
    path: "/mymovies",
    name: "My Movies",
    icon: "pe-7s-cloud-upload",
    component: Movies,
    layout: "/app",
    key:"hujhdkhj"
  },
  
  {
    path: "/myaccount",
    name: "My Account",
    component: Account,
    layout: "/app",
    key:"uuidjh"
  },
  
  {
    path: "/search",
    name: "Search Movies",
    component: Search,
    layout: "/app",
    key:"uihigdh"
  }
];

export default appRoutes;
