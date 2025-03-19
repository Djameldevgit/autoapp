
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';

const Menu = () => {
    const dispatch = useDispatch();
    const { auth, theme, notify } = useSelector(state => state); // Obtén el estado de autenticación, tema y notificaciones

    const { pathname } = useLocation(); // Para verificar la ruta actual




    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' }, // Sin función onClick
        { label: 'Search', icon: 'search', path: '#' }, // Función para abrir el modal de búsqueda
        { label: 'Discover', icon: 'fas fa-plus', path: 'message' } // Función para ejecutar el dispatch
    ];

    const isActive = (pn) => {
        if (pn === pathname) return 'active';
    };




    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                {navLinks.map((link, index) => (
                    <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                        <Link
                            className="nav-link"
                            to={link.path || '#'}
                            onClick={(e) => {
                                // Solo prevenir la navegación si hay una función onClick
                                if (link.onClick) {
                                    e.preventDefault();
                                    link.onClick();
                                }
                            }}
                        >
                            {link.icon.startsWith('fa') ? (
                                <i className={link.icon}></i>
                            ) : (
                                <span className="material-icons">{link.icon}</span>
                            )}
                        </Link>
                    </li>
                ))}





                {/* Icono de notificaciones */}
                <li className="nav-item dropdown" style={{ opacity: 1 }}>
                    <span className="nav-link position-relative" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="material-icons"
                            style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
                            favorite
                        </span>
                        <span className="notify_length">{notify.data.length}</span>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div>
                </li>

                {/* Menú para usuarios autenticados */}
                {auth.user ? (
                    <li className="nav-item dropdown" style={{ opacity: 1 }}>
                        <span className="nav-link dropdown-toggle" id="navbarDropdown"
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <Avatar src={auth.user.avatar} size="medium-avatar" />
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                            <Link className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                                Ajouter un annnoces
                            </Link>
                            <Link className="dropdown-item" to='/informacionaplicacion'>Info aplicacion</Link>
                            <Link className="dropdown-item" to='/messages'>Chat </Link>
                            <Link className="dropdown-item" to='/administration/roles'>Roles</Link>

                            {auth.user.role === "admin" && (
                                <>

                                    <Link className="dropdown-item" to='/administration/users/reportuser'>Reports user </Link>
                                    <Link className="dropdown-item" to='/administration/homepostspendientes'>Posts pendientes</Link>
                                    <Link className="dropdown-item" to='/administration/roles'>Roles</Link>
                                    <Link className="dropdown-item" to='/administration/usersaction'>Usuarios acción</Link>
                                    <Link className="dropdown-item" to='/administration/usersedicion'>Edición de usuarios</Link>
                                    <Link className="dropdown-item" to='/administration/listadeusuariosbloqueadoss'>Usuarios bloqueados</Link>
                                </>
                            )}

                            {/* Enlace al perfil */}
                            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>

                            {/* Cambiar tema */}
                            <label htmlFor="theme" className="dropdown-item"
                                onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                                {theme ? 'Light mode' : 'Dark mode'}
                            </label>

                            {/* Logout */}
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>
                                Desconexion
                            </Link>
                        </div>
                    </li>
                ) : (
                    // Menú para usuarios no autenticados
                    <div className="btn-group user-icon-container">
                        <i className="fas fa-user user-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to='/informacionaplicacion'>Info aplicacion</Link>
                            <Link className="dropdown-item" to='/login'>Se connecter</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to='/register'>S'inscrire</Link>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default Menu;