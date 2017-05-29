import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  Geocoder,
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  // Marker,
  GoogleMapsMapTypeId,
  AnimateCameraOptions
} from '@ionic-native/google-maps';
// import { FirebaseListObservable } from 'angularfire2/database';
import { StablishmentsProvider } from '../../providers/stablishments/stablishments'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  home: LatLng;
  markers: any[] = [];

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geocoder: Geocoder, private stablishmentsProvider: StablishmentsProvider) {
    this.home = new LatLng(9.4302559,-84.1647536);
  }

  ionViewWillEnter(): void {
    // document.getElementsByClassName('nav-decor')[0].className += ' hide';
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  ionViewWillLeave(): void {
    // document.getElementsByClassName('nav-decor')[0].className = 'nav-decor';
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element, {
      'mapType': GoogleMapsMapTypeId.ROADMAP,
      'controls': {
        'compass': false,
        'myLocationButton': false,
        'indoorPicker': true,
        'zoom': false
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'styles': [
        {
          featureType: "all",
          stylers: [
            { saturation: -80 }
          ]
        },{
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            { hue: "#00ffee" },
            { saturation: 50 }
          ]
        },{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ],
      'preferences': {
        'zoom': {
          'minZoom': 6,
          'maxZoom': 18
        },
        'building': true
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      this.removeAllMarkers();
      this.map.setMyLocationEnabled(true);
      this.startInMyLocation();
      window.setTimeout(()=>{
        this.goHome();
        window.setTimeout(()=>{
          this.loadStablishments()
        }, 2000);
      }, 2000);
    });
  }

  startInMyLocation(){
    this.map.getMyLocation({
      enableHighAccuracy: true
    }).then((location)=>{
      let position: CameraPosition = {
        target: location.latLng,
        zoom: 12,
        tilt: 30
      };
      this.map.clear();
      this.map.moveCamera(position);
    });
  }

  goHome(){
    let options: AnimateCameraOptions = {
      target: this.home,
      zoom: 15,
      tilt: 30,
      bearing: 140,
      duration: 2000
    };
    this.map.animateCamera(options);
  }

  goToMyLocation(){
    this.map.getMyLocation({
      enableHighAccuracy: true
    }).then((location)=>{
      let options: AnimateCameraOptions = {
        target: location.latLng,
        zoom: 15,
        tilt: 25,
        bearing: 140,
        duration: 2000
      };
      this.map.animateCamera(options);
    });
  }

  removeAllMarkers(){
    for(let marker of this.markers){
      marker.remove();
    }
  }

  loadStablishments(){
    console.log('loading stablishments')
    this.stablishmentsProvider.getStablishments().subscribe(stablishments => {
      this.map.clear();
      let position: LatLng;
      let markerOptions: MarkerOptions;
      stablishments.forEach(stablishment =>{
        position = new LatLng(stablishment.latitude ,stablishment.longitude);
        markerOptions = {
          position: position,
          title: stablishment.name,
          icon: {
            url: 'www/assets/icon/'+ stablishment.category +'.png',
            size: {
              'width': 20,
              'height': 30
            }
          }
        };
        this.markers.push(this.map.addMarker(markerOptions));
      });
    });
  }

}
