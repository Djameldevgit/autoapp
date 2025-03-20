import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { imageShow, videoShow } from '../utils/mediaShow';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { FormCheck } from 'react-bootstrap';
import Select from 'react-select';
import communesjson from "../json/communes.json"
import modelosjson from "../json/modelos.json"

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';  // Importar los estilos predeterminados

import { crearPostPendiente, updatePost } from '../redux/actions/postAproveAction';

const StatusModal = () => {
    const { auth, theme, socket, status, } = useSelector((state) => state);


    const dispatch = useDispatch()

    const initilastate = {

        subCategory: "",


        Vente: '',
        Location: '',


        title: "",
        description: "",
        price: "",
        unidaddeprecio: "",
        oferta: "",
        change: "",
        wilaya: "",
        commune: "",
        quartier: "",
        email: "",
        telefono: "",
        contadordevisitas: false,
        informacioncontacto: false,
        activarcomentarios: false,
        duraciondelanuncio: '',
        attributes: {
            marque: "",
            model: "",
            anne: "",
            finition: "",
            kilometrage: "",
            moteur: "",
            energie: "",
            boite: "",
            couleur: "",
            papiers: "",
            optionduvoiture: [],

        }
    }


    const [postData, setPostData] = useState(initilastate)
    const [images, setImages] = useState([])
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [selectedMarca, setSelectedMarca] = useState("");
    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

    const optionduvoiture = [
        { label: 'Climatisation', value: 'Climatisation' },
        { label: 'Alarme', value: 'Alarme' },
        { label: 'Jantes alliage', value: 'Jantes alliage' },
        { label: 'Rétroviseurs électriques', value: 'Retroviseurs électriques' },
        { label: 'Vitres électriques', value: 'Vitres électriques' },
        { label: 'ESP', value: 'ESP' },
        { label: 'Phares antibrouillard', value: 'Phares antibrouillard' },
        { label: 'Feux de jour', value: 'Feux de jour' },
        { label: 'Radar de recul', value: 'Radar de recul' },
        { label: 'Direction assistée', value: 'Direction assistée' },
        { label: 'Radio CD', value: 'Radio CD' },
        { label: 'Toit ouvrant', value: 'Toit ouvrant' },
        { label: 'Phares xénon', value: 'Phares xénon' },
        { label: 'Sièges chauffants', value: 'Sieges chauffants' },
        { label: 'Sièges en cuir', value: 'Sieges en cuir' },
        { label: 'Système de navigation (GPS)', value: 'GPS' },
        { label: 'Caméra de recul', value: 'Caméra de recul' },
        { label: 'Capteur de pluie', value: 'Capteur de pluie' },
        { label: 'Capteur de luminosité', value: 'Capteur de luminosité' },
        { label: 'Régulateur de vitesse', value: 'Regulateur de vitesse' },
        { label: 'Limiteur de vitesse', value: 'Limiteur de vitesse' },
        { label: 'Aide au stationnement', value: 'Aide au stationnement' },
        { label: 'Bluetooth', value: 'Bluetooth' },
        { label: 'Commande vocale', value: 'Commande vocale' },
        { label: 'Affichage tête haute', value: 'Affichage tête haute' },
        { label: 'Volant chauffant', value: 'Volant chauffant' },
        { label: 'Démarrage sans clé', value: 'Démarrage sans clé' },
        { label: 'Freinage d’urgence automatique', value: 'Freinage d’urgence automatique' },
        { label: 'Alerte de franchissement de ligne', value: 'Alerte de franchissement de ligne' },
        { label: 'Surveillance des angles morts', value: 'Surveillance des angles morts' },
        { label: 'Suspension adaptative', value: 'Suspension adaptative' },
        { label: 'Toit panoramique', value: 'Toit panoramique' },
        { label: 'Chargeur sans fil', value: 'Chargeur sans fil' },
        { label: 'Éclairage d’ambiance', value: 'Éclairage d’ambiance' },
        { label: 'Assistance au maintien de voie', value: 'Assistance au maintien de voie' }
    ];



    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        // Buscar la wilaya seleccionada
        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada ? wilayaEncontrada.commune : [];

        // Establecer la primera comuna disponible o vacío


        // Actualizar postData con la wilaya seleccionada
        setPostData((prevState) => ({
            ...prevState,
            wilaya: selectedWilaya,
            commune: communes.length > 0 ? communes[0] : "", // Actualizar comuna si hay una disponible
        }));
    };
    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));
    const communesOptions = selectedWilaya
        ? communesjson
            .find((wilaya) => wilaya.wilaya === selectedWilaya)
            ?.commune?.map((commune, index) => (
                <option key={index} value={commune}>
                    {commune}
                </option>
            ))
        : [];
    const handleCommuneChange = (event) => {
        const selectedCommune = event.target.value;

        // Actualizar postData con la comuna seleccionada
        setPostData((prevState) => ({
            ...prevState,
            commune: selectedCommune,
        }));
    };


    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setSelectedMarca(selectedMarca);

        // Buscar la wilaya seleccionada
        const marcaEncontrada = modelosjson.find((marca) => marca.marca === selectedMarca);
        const modelos = marcaEncontrada ? marcaEncontrada.modelo : [];

        // Establecer la primera comuna disponible o vacío


        // Actualizar postData con la wilaya seleccionada
        setPostData((prevState) => ({
            ...prevState,
            marca: selectedMarca,
            modelo: modelos.length > 0 ? modelos[0] : "", // Actualizar comuna si hay una disponible
        }));
    };
    const marcasOptions = modelosjson.map((marca, index) => (
        <option key={index} value={marca.marca}>
            {marca.marca}
        </option>
    ));
    const modelosOptions = selectedMarca
        ? modelosjson
            .find((marca) => marca.marca === selectedMarca)
            ?.modelo?.map((modelo, index) => (
                <option key={index} value={modelo}>
                    {modelo}
                </option>
            ))
        : [];
    const handleModeloChange = (event) => {
        const selectedModelo = event.target.value;

        // Actualizar postData con la comuna seleccionada
        setPostData((prevState) => ({
            ...prevState,
            modelo: selectedModelo,
        }));
    };


    const handleChangeoptionduvoiture = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                optionduvoiture: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };


    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;

        setPostData(prevState => {
            const isCheckbox = type === "checkbox";

            // Verificamos si el name pertenece a attributes
            const isAttribute = prevState.attributes && Object.prototype.hasOwnProperty.call(prevState.attributes, name);

            if (isAttribute) {
                // ✅ Si el campo pertenece a attributes, actualizamos dentro de attributes
                return {
                    ...prevState,
                    attributes: {
                        ...prevState.attributes,
                        [name]: isCheckbox ? checked : value
                    }
                };
            } else {
                // ✅ Si es un campo normal, lo actualizamos directamente
                return {
                    ...prevState,
                    [name]: isCheckbox ? checked : value
                };
            }
        });
    };





    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postData.wilaya || !postData.commune) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Por favor selecciona una wilaya y una comuna." },
            });
        }
        if (images.length === 0) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Por favor agrega una foto o video." },
            });
        }

        if (status.onEdit) {
            dispatch(updatePost({ postData, images, auth, status }));
        } else {
            dispatch(crearPostPendiente({ postData, images, auth, socket }));
        }

        setPostData(initilastate);
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    useEffect(() => {

        if (status?.onEdit) {
            setPostData({
                subCategory: status.subCategory || "",

                title: status.title || "",
                marca: status.marca || "",
                modelo: status.modelo || "",
                description: status.description || "",
                price: status.price || "",
                unidaddeprecio: status.unidaddeprecio || "",
                oferta: status.oferta || "",
                change: status.change || "",
                wilaya: status.wilaya || "",
                commune: status.commune || "",
                quartier: status.quartier || "",
                email: status.email || "",
                telefono: status.telefono || "",
                contadordevisitas: status.contadordevisitas || false,
                informacioncontacto: status.informacioncontacto || false,
                activarcomentarios: status.activarcomentarios || false,
                duraciondelanuncio: status.duraciondelanuncio || "",
                attributes: {
                    marque: status.attributes?.marque || "",
                    model: status.attributes?.model || "",
                    anne: status.attributes?.anne || "",
                    finition:status.attributes?.finition || "",
                    kilometrage: status.attributes?.kilometrage || "",
                    moteur: status.attributes?.moteur || "",
                    energie: status.attributes?.energie || "",

                    boite: status.attributes?.boite || "",
                    couleur: status.attributes?.couleur || "",
                    papiers: status.attributes?.papiers || "",
                    optionduvoiture: status.attributes?.optionduvoiture || [],
                },
            });
            setImages(status.images || []);
            setSelectedWilaya(status.wilaya || "");
            setSelectedMarca(status.marca || "");

        }
    }, [status]);

    const subcategoryy = () => (
        <div className="form-group">
            <select name="subCategory" value={postData.subCategory} onChange={handleChangeInput} className="form-control" required>
                <option value="">Catégorie...</option>
                <option value="Vente">Vente</option>
                <option value="Location">Location</option>

            </select>
            <small className='text-danger'>Ce champ est requis</small>
        </div>
    )

    const itemssubcategory = () => (
        <div className="form-group">
            <select
                name="title"
                value={postData.title}
                onChange={handleChangeInput}
                className="form-control"
                required
            >
                <option value="">Sélectionner une sub catégorie</option>
                <option value="Voitures">Voitures</option>
                <option value="Utilitaire">Utilitaire</option>
                <option value="Motos_Scooters">Motos & Scooters</option>
                <option value="Quads">Quads</option>
                <option value="Fourgon">Fourgon</option>
                <option value="Camion">Camion</option>
                <option value="Bus">Bus</option>
                <option value="Engin">Engin</option>
                <option value="Tracteurs">Tracteurs</option>
                <option value="Remorques">Remorques</option>
                <option value="Bateaux_Barques">Bateaux & Barques</option>
                <option value="Camping_Cars">Camping-Cars</option>
                <option value="Scooters_électriques">Scooters électriques</option>
                <option value="Moto_cross">Moto cross</option>
                <option value="Vélo_électrique">Vélo électrique</option>
                <option value="Trottinettes_électriques">Trottinettes électriques</option>
                <option value="Jet_ski">Jet ski</option>
                <option value="Yacht">Yacht</option>
                <option value="Bus_de_tourisme">Bus de tourisme</option>
                <option value="Camion_de_déménagement">Camion de déménagement</option>
                <option value="Bulldozer">Bulldozer</option>
                <option value="Grue">Grue</option>
                <option value="Trains">Trains</option>
                <option value="Hélicoptère">Hélicoptère</option>
                <option value="Avion_prive">Avion privé</option>
            </select>
            <small className="text-danger">Ce champ est requis</small>
        </div>
    )

    const marca = () => (
        <div>
            <select
                multiple={false}
                className="form-control"
                name="marca"
                value={postData.marca} // Usar postData.wilaya
                onChange={handleMarcaChange}
            >
                <option value="">Sélectionnez une marque</option>
                {marcasOptions} {/* Opciones de wilayas */}
            </select>
            <small className="text-danger">Ce champ est requis</small>
        </div>
    )
    const modelo = () => (
        <div>
            <select
                multiple={false}
                className="form-control"
                name="modelo"
                value={postData.modelo}
                onChange={handleModeloChange}
            >
                <option value="">Sélectionnez la modelo</option>
                {modelosOptions}
            </select>
            <small className="text-danger">Ce champ est requis</small>
            <small className="text-danger">Ce champ est requis</small>
        </div>
    )

    const marque = () => (
        <div>
            <input
                type="text"
                name="marque"
                placeholder="Marque"
                value={postData.attributes.marque}
                className="form-control"
                onChange={handleChangeInput}
            />
        </div>
    )
    const model = () => (
        <div>
            <input
                type="text"
                name="model"
                placeholder="Modèle"
                value={postData.attributes.model}
                className="form-control"
                onChange={handleChangeInput}
            />
        </div>
    )

    const anne = () => (
        <div>
            <select
                name="anne"
                className="form-control"
                value={postData.attributes.anne}
                onChange={handleChangeInput}
            >
                <option value="">Sélectionner l'année</option>
                {Array.from({ length: 50 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    );
                })}
            </select>
        </div>
    )

    const finition = () => (
        <input
            type="text"
            name="finition"
            placeholder="finition"
            value={postData.attributes.finition}
            className="form-control"
            onChange={handleChangeInput}
        />
    )

    const motorisation = () => (
        <input
            type="text"
            name="moteur"
            placeholder="Moteur"
            value={postData.attributes.moteur}
            className="form-control"
            onChange={handleChangeInput}
        />
    )
    const energie = () => (
        <select
            multiple={false}
            name="energie"
            value={postData.attributes.energie}
            onChange={handleChangeInput}
            className="form-control"
        >
            <option  >Energie</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="GPL">GPL</option>

        </select>
    )

    const boite = () => (
        <select
            multiple={false}
            name="boite"
            value={postData.attributes.boite}
            onChange={handleChangeInput}
            className="form-control"
        >
            <option  >Boite</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
            <option value="Semi Automatique">Semi AutomatiqueL</option>

        </select>
    )


    const kilometrage = () => (
        <div className="form-group">
            <label className="text-danger"> Spécifications</label>
            <input onChange={handleChangeInput} value={postData.attributes.kilometrage} name="kilometrage" type="number" className="form-control" placeholder='kilometrage en KM' />

        </div>
    )


    const couleur = () => (
        <div>
            <div className="form-group">
                <select
                    multiple={false}
                    name="couleur"
                    value={postData.attributes.couleur}
                    onChange={handleChangeInput}
                    className="form-control"
                >
                    <option value="">Couleur</option>
                    <option value="Blanc">Blanc</option>
                    <option value="Noir">Noir</option>
                    <option value="Gris">Gris</option>
                    <option value="Argent">Argent</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Bleu clair">Bleu clair</option>
                    <option value="Bleu marine">Bleu marine</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Bordeaux">Bordeaux</option>
                    <option value="Vert">Vert</option>
                    <option value="Vert foncé">Vert foncé</option>
                    <option value="Jaune">Jaune</option>
                    <option value="Orange">Orange</option>
                    <option value="Marron">Marron</option>
                    <option value="Beige">Beige</option>
                    <option value="Violet">Violet</option>
                    <option value="Rose">Rose</option>
                    <option value="Obergine">Obergine</option>
                    <option value="Doré">Doré</option>
                    <option value="Bronze">Bronze</option>
                </select>
            </div>
        </div>
    )

    const papiers = () => (
        <select
            multiple={false}
            name="papiers"
            value={postData.attributes.papiers}
            onChange={handleChangeInput}
            className="form-control"
        >
            <option  >Papiers</option>
            <option value="Carte Gris / Safia">Carte Gris / Safia</option>
            <option value="Carte Jaune">Bleu</option>
            <option value="Licence / Délai">Licence / Délai</option>
        </select>

    )
    const optionduvoitures = () => (
        <Select
            placeholder="Option du voiture"
            value={optionduvoiture.filter(obj => postData.attributes.optionduvoiture && postData.attributes.optionduvoiture.includes(obj.value))}
            options={optionduvoiture}
            onChange={handleChangeoptionduvoiture}
            isMulti={true}
            closeMenuOnSelect={false}
        />

    )

    return (
        <div className='status_modal'  >
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Annonces Immobilière</h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>
                <div className="status_body">
                    <div className="form-group"   >
                        <input
                            className='form-control'
                            type="hidden"
                            name="category"
                            value={postData.category}
                            onChange={handleChangeInput}
                            placeholder="Category" />
                    </div>
                    <div className="form-group">
                        {subcategoryy()}
                    </div>


                    {postData.subCategory === "Vente" && (
                        <div>
                            <div className="form-group">
                                {itemssubcategory()}
                            </div>

                            {postData.title === "Voitures" && (
                                <div className='form-group'>

                                    <div className="form-group">
                                        {marca()}
                                    </div>
                                    <div className="form-group">
                                        {modelo()}
                                    </div>
                                    <div className="form-group">
                                        {marque()}
                                    </div>
                                    <div className="form-group"  >
                                        {model()}
                                    </div>

                                    <div className="form-group" >
                                        {anne()}
                                    </div>
                                    <div className="form-group">
                                        {finition()}
                                    </div>

                                    <div className="form-group"  >
                                        {motorisation()}
                                    </div>
                                    <div className="form-group"  >
                                        {energie()}
                                    </div>
                                    <div className="form-group">
                                        {kilometrage()}
                                    </div>

                                    <div className="form-group">
                                        {boite()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <div className="form-group">
                                            {couleur()}
                                        </div>
                                        <div className="form-group">
                                            {papiers()}
                                        </div>
                                        <div className="form-group">
                                            {optionduvoitures()}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    )}







                    {postData.subCategory === "Location" && (
                        <div>

                        </div>
                    )}








                    <div className="form-group">
                        <textarea name="description" value={postData.description}
                            onChange={handleChangeInput}
                            placeholder='Description...'
                        />
                    </div>
                    <div className="card-body form-group">
                        <label className="text-primary">Prix</label>
                        <div style={{ padding: '0 20px' }}>
                            <Slider
                                min={500}
                                max={2000000}
                                step={500}
                                value={postData.price || 0} // Si no hay precio, el slider empieza en 0
                                onChange={(value) => {
                                    setPostData(prevState => ({
                                        ...prevState,
                                        price: value // Solo actualizamos el valor de 'price'
                                    }));
                                }}
                                trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                                handleStyle={{
                                    borderColor: '#00AF72',
                                    height: 20,
                                    width: 20,
                                    marginLeft: -10,
                                    marginTop: -5,
                                    backgroundColor: '#007bff',
                                }}
                                railStyle={{ backgroundColor: '#ccc', height: 10 }}
                            />
                        </div>

                        <div style={{ marginTop: 10 }}>
                            {postData.price}
                        </div>
                    </div>

                    <div className="form-group">

                        <select
                            multiple={false}
                            name="unidaddeprecio"
                            value={postData.unidaddeprecio}
                            onChange={handleChangeInput}
                            className="form-control"
                        >
                            <option  >Unité de prix</option>
                            <option value="DA">DA</option>
                            <option value="Millions">Millions</option>
                            <option value="Milliard">Milliard</option>
                            <option value="DA (m²)">DA (m²)</option>
                            <option value="Millions (m²) ">Millions (m²)</option>

                        </select>
                    </div>

                    <div className="form-group">

                        <select
                            multiple={false}
                            name="oferta"
                            value={postData.oferta}
                            onChange={handleChangeInput}
                            className="form-control"
                        >
                            <option >Type D'offre</option>
                            <option value="Fixe">Fixe</option>
                            <option value="Négociable">Négociable</option>
                            <option value="Offert">Offert</option>

                        </select>
                    </div>

                    <div className="form-group">

                        <select
                            multiple={false}
                            name="change"
                            value={postData.change}
                            onChange={handleChangeInput}
                            className="form-control"
                        >
                            <option  >Change</option>

                            <option value="J'accepte l'échange">J'accepte l'échange</option>
                            <option value="Pas d'échanges">Pas d'échanges </option>

                        </select>
                    </div>

                    <div className="form-group">
                        <small className="text-primary">Adresse du bien obligatoire</small>
                        <select
                            multiple={false}
                            className="form-control"
                            name="wilaya"
                            value={postData.wilaya} // Usar postData.wilaya
                            onChange={handleWilayaChange}
                        >
                            <option value="">Sélectionnez une wilaya</option>
                            {wilayasOptions} {/* Opciones de wilayas */}
                        </select>
                        <small className="text-danger">Ce champ est requis</small>
                    </div>

                    {/* Campo Commune */}
                    <div className="form-group">
                        <select
                            multiple={false}
                            className="form-control"
                            name="commune"
                            value={postData.commune} // Usar postData.commune
                            onChange={handleCommuneChange}
                        >
                            <option value="">Sélectionnez la commune</option>
                            {communesOptions} {/* Opciones de communes */}
                        </select>
                        <small className="text-danger">Ce champ est requis</small>
                    </div>

                    <div className="form-group">

                        <input onChange={handleChangeInput} value={postData.quartier} name="quartier" type="text" className="form-control" placeholder='Quartier' />

                    </div>

                    <div className="form-group">

                        <input onChange={handleChangeInput} value={postData.telefono} name="telefono" type="number" className="form-control" placeholder='Téléphone' />

                    </div>


                    <div className="form-group">

                        <input onChange={handleChangeInput} value={postData.email} name="email" type="email" className="form-control" placeholder='Adresse mail ' />
                        <small className='text-danger'>Ce champ est requis</small>
                    </div>



                    <div>
                        <label className="text-primary">Options Générales</label>
                        <div className="form-group">
                            <FormCheck
                                type="checkbox"
                                checked={postData.contadordevisitas}
                                onChange={(e) => setPostData({ ...postData, contadordevisitas: e.target.checked })}
                                label="Afficher lo compteur des visites"
                            />
                        </div>
                        <div className="form-group">
                            <FormCheck
                                type="checkbox"
                                checked={postData.informacioncontacto}
                                onChange={(e) => setPostData({ ...postData, informacioncontacto: e.target.checked })}
                                label="Autoriser les informations de contact"
                            />
                        </div>

                        <div className="form-group">
                            <FormCheck
                                type="checkbox"
                                checked={postData.activarcomentarios}
                                onChange={(e) => setPostData({ ...postData, activarcomentarios: e.target.checked })}
                                label="Activer les commentaires"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-primary">Durée de l' annonces</label>
                            <select
                                multiple={false}
                                onChange={handleChangeInput} value={postData.duraciondelanuncio} name="duraciondelanuncio" className="form-control" >

                                <option value="nepasdesactiver">Ne pas désactiver</option>
                                <option value="15 jour">15 Jours</option>
                                <option value="1 mois">1 Mois</option>
                                <option value="3 mois">3 Mois</option>
                                <option value="6 mois">6 Mois</option>

                            </select>
                        </div>


                    </div>


                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ? <>
                                                    {
                                                        img.url.match(/video/i)
                                                            ? videoShow(img.url, theme)
                                                            : imageShow(img.url, theme)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        img.type.match(/video/i)
                                                            ? videoShow(URL.createObjectURL(img), theme)
                                                            : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>



                    <div className="status_footer">
                        <button className="btn btn-secondary w-100" type="submit">
                            Publie
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default StatusModal
