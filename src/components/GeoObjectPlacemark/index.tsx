import React, { useRef, useState } from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { Portal } from '../Portal';
import CustomBalloon from '../CustomBalloon';
import { GeoObject } from '../../types/name';
import { useAppSelector } from '../../hooks/redux';
import { GeoObjectPlacemarkProps } from './types';
import Notification from '../UI/Notification';
import warning from '../../assets/images/warning.png';

const GeoObjectPlacemark: React.FC<GeoObjectPlacemarkProps> = ({ item }) => {
  const [activePortal, setActivePortal] = useState(false);
  const geoObjects = useAppSelector((state) => state.geoObjectsReducer);
  const [notification, setNotification] = useState(false);
  const [authNotification, setAuthNotification] = useState(false);

  const placemark = useRef(null);
  const getPlacemarkOptions = (object: GeoObject) => {
    const matchingCategory = geoObjects.filters.find((category: any) =>
      object.rubrics.some((rubric: any) => category.categories.includes(Number(rubric.id))),
    );

    const imageSize = matchingCategory?.icon ? [30, 42] : [0, 0];
    return {
      iconLayout: 'default#image',
      iconImageHref: matchingCategory?.icon,
      iconImageSize: imageSize,
    };
  };

  const handleSetActivePortal = () => {
    setActivePortal(!activePortal);
  };

  const handleCloseBalloon = () => {
    if (placemark.current) placemark.current.balloon.close();
    setActivePortal(false);
  };

  const handleViewNotification = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 4000);
  };

  const handleViewAuthNotification = () => {
    setAuthNotification(true);
    setTimeout(() => {
      setAuthNotification(false);
    }, 4000);
  };
  return (
    <>
      <Placemark
        key={item.id}
        geometry={[item.point.lat, item.point.lon]}
        instanceRef={placemark}
        options={getPlacemarkOptions(item)}
        properties={{
          balloonContent: '<div id="custom-balloon" class="balloon-card"></div>',
        }}
        onBalloonOpen={handleSetActivePortal}
        onBalloonClose={handleSetActivePortal}
      />
      {activePortal && (
        <Portal elementId={'custom-balloon'}>
          <CustomBalloon
            item={item}
            handleCloseBalloon={handleCloseBalloon}
            handleViewNotification={handleViewNotification}
            handleViewAuthNotification={handleViewAuthNotification}
          />
        </Portal>
      )}

      {notification && (
        <Notification bgColor={'#C75E5E'} icon={warning}>
          Место успешно добавлено в избранное!
        </Notification>
      )}

      {authNotification && (
        <Notification bgColor={'#ec5353'} icon={warning}>
          Необходимо авторизоваться!
        </Notification>
      )}
    </>
  );
};

export default GeoObjectPlacemark;
