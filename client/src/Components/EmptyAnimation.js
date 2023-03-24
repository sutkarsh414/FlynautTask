import Lottie from 'react-lottie';


const EmptyAnimation = (props)=>{
    const defaultOptions = {
        loop: props.isLoop,
        autoplay: true,
        animationData: props.animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div id="EmptyAnimation" className={`w-full h-full ${props.className}`}>
        <Lottie 
          options={defaultOptions}
        />
      </div>
    );
}

export default EmptyAnimation;