/**
 * Search Page Design
 * 
 * Path: /lesson/search-page-design
 */

import Router from '#Router'

import Header from './Components/SearchPageDesign/Header'
import Search from './Components/SearchPageDesign/Search'
import Footer from './Components/SearchPageDesign/Footer'

const SearchPageDesign = () => {
	
	return <div className="h-full flex flex-col justify-between">
		<Header />
		<Search />
		<Footer />
	</div>
}

Router.setRoute('/lesson/search-page-design', <SearchPageDesign />, 'Search Page Design')
Router.setRoute('/lesson', <SearchPageDesign />)

export default SearchPageDesign
