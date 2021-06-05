import React from 'react';
import './Searchpg.css';
import { useStateValue } from './StateProvider';
import useGoogleSearch from "./useGoogleSearch";
import Response from "./response";
import{ Link }  from "react-router-dom";
import Search from "./Search"
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";


function SearchPage() {
    const [{ term }, dispatch] =useStateValue();
    const { data } = useGoogleSearch(term);
    //const data = Response;
    console.log(data);
    return (
        <div className='searchpage'>
            <div className='searchpage_header'>
                <Link to="/">
                    <img className="searchpage_logo"
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt=""/>
                </Link>
                <div className='searchpage_headerbody'>
                    <Search hideButtons />
                    <div className="searchpage_options">
                        <div className="searchpage_optionsleft">
                            <div className="searchpage_op">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchpage_op">
                                <DescriptionIcon />
                                <Link to="/news">News</Link>
                            </div>
                            <div className="searchpage_op">
                                <ImageIcon />
                                <Link to="/image">Image</Link>
                            </div>
                            <div className="searchpage_op">
                                <LocalOfferIcon />
                                <Link to="/shopping">Shopping</Link>
                            </div>
                            <div className="searchpage_op">
                                <RoomIcon />
                                <Link to="/maps">Maps</Link>
                            </div>
                            <div className="searchpage_op">
                                <MoreVertIcon />
                                <Link to="/more">More</Link>
                            </div>
                        </div>
                        <div className="searchpage_optionsright">
                            <div className="searchpage_op">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchpage_op">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {term &&(
                <div className='searchpage_results'>
                    <p className="searchpage_resultcount">
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}.
                    </p>
                    {data?.items.map(item =>(
                        <div className='searchpage_res'>
                           <a href={item.link}>
                               {item.pagemap?.cse_image?.length>0 && item.pagemap?.cse_image[0]?.src &&(
                                   <img className="searchpage_resultimage" src={item.pagemap?.cse_image[0]?.src} alt="" />
                               )}
                                {item.displayLink}
                            </a> 
                            <a className="searchpage_resulttitle" href={item.link}>
                                <h2>{item.title}</h2>
                            </a>
                            <p className="searchpage_resultsnippet">
                                {item.snippet}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default SearchPage
