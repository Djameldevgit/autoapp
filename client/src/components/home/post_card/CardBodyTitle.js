import React from "react";
import { useLocation } from "react-router-dom";

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const isDetailPage = location.pathname === `/post/${post._id}`;

    return (
        <div className="cardtitle">
            <div className="card-header">
                {!isDetailPage && (
                    <div>
                        <div className="title-post">
                            <div className="title0">{post.subCategory}</div>
                            <div className="title0">{post.marca}</div>
                            <div className="title2">{post.modelo}</div>

                            <div className="title3"> {post.attributes.anne}</div>


                        </div>

                    </div>
                )}


            </div>

            {!isDetailPage && (

                <div className="titlelocation">


                    <span> <i className="fas fa-map-marker-alt" ></i></span>
                    <div className="title4">{post.wilaya}</div>
                    <div className="title4">{post.commune},</div>
                    <div ><span className="ml-1 mr-1 text-danger">{post.price}</span> <span>{post.unidaddeprecio}</span> <span> </span></div>
                </div>
            )}

        </div>
    );
};

export default CardBodyTitle;




