/**
 * Search Page Design
 * 
 * Path: /lesson/search-page-design
 */

import Router from '#Router'

import Header from './SearchPageDesign/Header'
import Search from './SearchPageDesign/Search'
import Footer from './SearchPageDesign/Footer'

const SearchPageDesign = () => {
	
	return <div className="h-full flex flex-col justify-between">
		<Header />
		<Search />
		<Footer />
	</div>
}

Router.addRoute('/lesson/search-page-design', <SearchPageDesign />, 'Search Page Design')
Router.addRoute('/lesson', <SearchPageDesign />)

export default SearchPageDesign
