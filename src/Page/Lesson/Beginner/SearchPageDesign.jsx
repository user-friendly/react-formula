/**
 * Search Page Design
 * 
 * Path: /lesson/search-page-design
 */

import Header from '../Components/SearchPageDesign/Header'
import Search from '../Components/SearchPageDesign/Search'
import Footer from '../Components/SearchPageDesign/Footer'

const SearchPageDesign = () => {
	
	return <div className="h-full min-h-[700px] flex flex-col justify-between">
		<Header />
		<Search />
		<Footer />
	</div>
}

// Router.setRoute('/lesson/search-page-design', <SearchPageDesign />, 'Search Page Design')

export default SearchPageDesign
