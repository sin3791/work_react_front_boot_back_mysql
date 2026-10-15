import { useEffect } from "react"

const {kakao} = window

function KakaoMap(){

    
    useEffect(()=>{
        CurrentPosition();
    },[])

    function CurrentPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position)
                const latitute = position.coords.latitude;
                const longitude = position.coords.longitude;
                KakaoMapStart(latitute, longitude);

            })
        }else{
            console.log("위치정보가 없습니다.")
        }
    }
    function KakaoMapStart(lat, lng){
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        var center = new kakao.maps.LatLng(lat, lng);
        var mapOption = { 
            center: center,
            level: 3 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
        
        
        // var markerPosition  = new kakao.maps.LatLng(lat, lng); 

       
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({position: center});

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }

    // 마커가 표시될 위치입니다 

    return (
        <div style={{width: "100%", minHeight:"90vh", background:"pink"}} id="map"></div>
    )
}

export default KakaoMap