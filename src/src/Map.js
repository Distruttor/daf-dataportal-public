import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import ReactFileReader from "react-file-reader"

const parse = require('csv-parse/lib/sync');


let lat_label;
let lon_label;
let lat_labels = ['lat', 'latitudine', 'latitude', 'latitudine_v', 'latitudine_p'];
let lon_labels = ['lon', 'longitudine', 'lng', 'longitude','longitudine_v', 'longitudine_p'];



const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{ lat: 43.109965, lng: 12.388408 }}
    >

        {props.markers.length > 0 && props.markers.map((marker,indice) =>
            <Marker position={{ lat:parseFloat(marker[lat_label]) , lng: parseFloat(marker[lon_label]) }} onClick={() => props.onMarkerClick(indice)}>
                {console.log(props.isOpen)}
                {props.isOpen == indice && <InfoWindow onCloseClick={() => props.onMarkerClick(-1)}>
                    <div>
                        {props.markerHeaders.map((header) =>
                            <div>
                                <b>{header + ": "}</b> {marker[header]}
                            </div>
                        )}
                    </div>
                </InfoWindow>}

            </Marker>
        )}

    </GoogleMap>
)

/*
 {props.markerHeaders.map((header) => header + ": " + marker[header] + "\n")}  YUPPII!
 {props.markerHeaders.map((header) => <div> {header + ": " + marker[header]} </div>)}
*/


class Map extends React.PureComponent {
    state = {
        markers : [],
        markerHeaders : [],
        isOpen: -1
    }


    componentDidMount() {
    }

    handleMarkerClick = (indice) => {
        this.setState({isOpen: indice});
    }


    check_headers = (headers,labels) => {
        for(let i = 0; i < labels.length; i++) {
            for(let j = 0; j < headers.length; j++) {
                if(labels[i].toLowerCase() === headers[j].toLowerCase()) {
                    return headers[j];
                }
            }
        }
        return "";
    };

    changeStatus = (status) => {
        return !status;
    }

    nomeParametri  = (oggetto) => {
        return Object.keys(oggetto);
    }

    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = () => {
            const records = parse(reader.result, {columns: true});
            console.log(records);
            let headers = this.nomeParametri(records[0]);
            lat_label = this.check_headers(headers, lat_labels);
            lon_label = this.check_headers(headers, lon_labels);
            console.log()

            this.setState ({markers : records, markerHeaders:headers})
        }
        reader.readAsText(files[0]);
    }



    render() {
        return (
            <div>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.txt'}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>

                <MyMapComponent
                    onMarkerClick={this.handleMarkerClick}
                    markers={this.state.markers}
                    markerHeaders = {this.state.markerHeaders}
                    isOpen = {this.state.isOpen}
                />

            </div>
        )
    }
}

export default Map;