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
  Marker,
  GoogleMapsMapTypeId,
  AnimateCameraOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  home: LatLng;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geocoder: Geocoder) {
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
      this.map.setMyLocationEnabled(true);
      // this.map.getUiSettings().setMyLocationButtonEnabled(false);
      this.startInMyLocation();
      window.setTimeout(()=>{
        this.goHome();
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

}
