import {useNavigation} from '@react-navigation/native';

const useNavigateToScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = screen => {
    navigation.navigate(screen);
  };

  return navigateToScreen;
};

export default useNavigateToScreen;
