 
import Description from './Description';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
   
    return (
        <div className="description-container">
            <div className="post-info">
                <div className="info-item">
                    <i className="fas fa-car"></i>
                    <span className="info-value">{post.title}</span>
                    <span className="info-value">{post.marca}</span>
                    <span className="info-value">{post.modelo}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="info-label">Publié le:</span>
                    <span className="info-value">{new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-sync-alt"></i>
                    <span className="info-label">Actualisé le:</span>
                    <span className="info-value">{new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}</span>
                </div>

                {(post.vistas || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-eye"></i>
                        <span className="info-label">Vue:</span>
                        <span className="info-value">{post.vistas}</span>
                    </div>
                )}

                {post.attributes.anne && (
                    <div className="info-item">
                        <i className="fas fa-calendar"></i>
                        <span className="info-label">Année:</span>
                        <span className="info-value">{post.attributes.anne}</span>
                    </div>
                )}
                {post.attributes.kilometrage && (
                    <div className="info-item">
                        <i className="fas fa-road"></i>
                        <span className="info-label">Kilométrage:</span>
                        <span className="info-value">{post.attributes.kilometrage} Km</span>
                    </div>
                )}
                {post.attributes.moteur && (
                    <div className="info-item">
                        <i className="fas fa-cogs"></i>
                        <span className="info-label">Moteur:</span>
                        <span className="info-value">{post.attributes.moteur}</span>
                    </div>
                )}
                {post.attributes.energie && (
                    <div className="info-item">
                        <i className="fas fa-gas-pump"></i>
                        <span className="info-label">Énergie:</span>
                        <span className="info-value">{post.attributes.energie}</span>
                    </div>
                )}
                {post.attributes.boite && (
                    <div className="info-item">
                        <i className="fas fa-tachometer-alt"></i>
                        <span className="info-label">Boîte:</span>
                        <span className="info-value">{post.attributes.boite}</span>
                    </div>
                )}
                {post.attributes.couleur && (
                    <div className="info-item">
                        <i className="fas fa-palette"></i>
                        <span className="info-label">Couleur:</span>
                        <span className="info-value">{post.attributes.couleur}</span>
                    </div>
                )}

                {post.attributes.optionduvoiture && post.attributes.optionduvoiture.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-list-ul"></i>
                        <span className="info-label">Options de voiture:</span>
                        <span className="info-value">{post.attributes.optionduvoiture.join(", ")}</span>
                    </div>
                )}
                
                <Description post={post} readMore={readMore} setReadMore={setReadMore} />
            </div>
        </div>
    );
};

export default DescriptionPost;
