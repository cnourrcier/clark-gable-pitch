import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Location.css';


const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

const propertyLocation = {
    latitude: 33.83140,
    longitude: -116.54887,
    zoom: 13
};

const initialViewLocation = {
    latitude: 33.8380,
    longitude: -116.54887,
    zoom: 13
}

const markerInfo = {
    longitude: propertyLocation.longitude,
    latitude: propertyLocation.latitude,
    name: "Clark Gable Estate",
    address: "222 W Chino Dr. Palm Springs, CA 92262"
};

const mapStyles = [
    { name: "Streets", url: "mapbox://styles/mapbox/streets-v11" },
    { name: "Satellite", url: "mapbox://styles/mapbox/satellite-v9" },
    { name: "Light", url: "mapbox://styles/mapbox/light-v10" },
    { name: "Dark", url: "mapbox://styles/mapbox/dark-v10" }
];

const CustomMarker = ({ onClick }) => (
    <div className="custom-marker" onClick={onClick}>
        <MapPin className="icon" fill="rgba(255, 0, 0, 0.5)" stroke="red" />
    </div>
);

const Location = () => {
    const [popupInfo, setPopupInfo] = useState(markerInfo);
    const [currentStyle, setCurrentStyle] = useState(mapStyles[0].url);

    const handleMarkerClick = () => {
        !popupInfo ? setPopupInfo(markerInfo) : setPopupInfo(null);
    };

    return (
        <section className="location">
            <h2>Location</h2>
            <div className="location-content">
                <div className="map-container">
                    <Map
                        initialViewState={initialViewLocation}
                        style={{ width: '100%', height: 400 }}
                        mapStyle={currentStyle}
                        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                    >
                        <Marker
                            longitude={markerInfo.longitude}
                            latitude={markerInfo.latitude}
                        >
                            <CustomMarker onClick={handleMarkerClick} />
                        </Marker>

                        {popupInfo && (
                            <Popup
                                anchor="bottom"
                                longitude={popupInfo.longitude}
                                latitude={popupInfo.latitude}
                                closeOnClick={false}
                                className='custom-popup'
                            >
                                <div className='popupInfo'>
                                    <img src='https://via.placeholder.com/300x200.png?text=Property+Image' alt='Property' />
                                    <div className='popup-content'>
                                        <h3>{popupInfo.name}</h3>
                                        <p>{popupInfo.address}</p>
                                    </div>
                                </div>
                            </Popup>
                        )}

                        <NavigationControl position='top-right' />
                        <FullscreenControl position='top-right' />
                        <GeolocateControl position='top-right' />
                    </Map>
                    <div className='map-style-switcher'>
                        {mapStyles.map((style, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStyle(style.url)}
                                className={currentStyle === style.url ? 'active' : ''}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Location;