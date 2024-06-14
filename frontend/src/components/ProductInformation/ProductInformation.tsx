import React, { useContext, useEffect, useState } from 'react';
import { IIconProps, Icon, PrimaryButton, Stack, Text, css } from '@fluentui/react';
import WalkAround from './WalkAround';
import FlashCard from './FlashCard';
import styles from '../../pages/chat/Chat.module.css'
import { useNavigate } from 'react-router-dom';
import { Library16Filled, Library24Filled, Library28Filled, VehicleShip16Filled, VehicleShip24Filled } from '@fluentui/react-icons';
import { AppStateContext } from '../../state/AppProvider';
import { templete2, templete3 } from '../../constants/templete';
import { getValuePropositions, getWalkthroughData } from '../../api';
import BackButton from '../BackButton';
 
const ProductInformation: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('FlashCard');
  const navigate = useNavigate();
  const appStateContext = useContext(AppStateContext);
  const selectedboat = appStateContext?.state?.selectedBoat;
  const conversationId = appStateContext?.state?.conversationId;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
 
    window.addEventListener('resize', handleResize);
 
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const renderLibraryIcon = () => {
    if (screenWidth <= 1000) {
      return <Library16Filled />;
    } else if (screenWidth > 1000 && screenWidth <= 2500) {
      return <Library28Filled />;
    }
  };
  const renderBoatIcon = () => {
    if (screenWidth <= 1000) {
      return <VehicleShip16Filled />;
    } else if (screenWidth > 1000 && screenWidth <= 2500) {
      return <VehicleShip24Filled />;
    }
  };
 
 
  const fetch = async () => {
    try {
      appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_LOADING', payload: true })
      appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_LOADING', payload: true })
 
      const valuePropositionsResponse = await getValuePropositions(templete2(selectedboat || ""),conversationId || "")
      // const valuePropositionsResponse =
      // {
      //   "messages": "{\"result\": [{\"title\": \"TRACK FORMED fence design with high-sheen finish\", \"detail\": \"Delivers enhanced aesthetic appeal and durability\"}, {\"title\": \"10\’ SUN TRACKER QuickLift Bimini top\", \"detail\": \"Provides easy and quick protection from the sun\"}, {\"title\": \"SUN TRACKER FLARE touchscreen gauge display & 12-button switch panel\", \"detail\": \"Offers modern, easy-to-use navigational and control features\"}, {\"title\": \"Wet Sounds stereo with Bluetooth & two 6.5\\\" upholstery speakers\", \"detail\": \"Ensures high-quality audio entertainment on the water\"}, {\"title\": \"New motor & adaptor harnesses\", \"detail\": \"Improves performance and compatibility with various accessories\"}]}"
      // }
      // const walkaroundResponse =
      // {
      //   "messages": "{\"result\": [{\"title\": \"Driver Console\", \"detail\": \"Features an advanced 8\” TAHOE CRUISE\® digital touchscreen dashboard for unprecedented insight and control, paired with a sport steering wheel and responsive hydraulic steering.\"}, {\"title\": \"Seating Capacity\", \"detail\": \"Accommodates up to 11 passengers in a feature-rich interior, ensuring comfort during full days of cruising and adventure.\"}, {\"title\": \"Entertainment System\", \"detail\": \"Equipped with a powerful KICKER\® Bluetooth stereo system and an advanced phone management station for all-day entertainment.\"}, {\"title\": \"Storage Solutions\", \"detail\": \"Plentiful storage options are available for all your gear, keeping the deck clear and organized.\"}, {\"title\": \"Water Sports Features\", \"detail\": \"Comes with a removable ski tow pylon for water sports and adventure.\"}, {\"title\": \"Swim Platforms\", \"detail\": \"Features aft swim platforms with a boarding ladder, making it easy to access the water.\"}]}"
      // }
 
      if (valuePropositionsResponse) {
        const parsedDataValueProps = JSON.parse(valuePropositionsResponse?.messages);
        const valuePropositions = parsedDataValueProps?.result
        appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_STATE', payload: valuePropositions })
      }
      const walkaroundResponse = await getWalkthroughData(templete3(selectedboat || ""),conversationId || "")
 
      if (walkaroundResponse) {
        const parsedDataWalkThrough = JSON.parse(walkaroundResponse?.messages);
        const walkThrough = parsedDataWalkThrough?.result
        appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_STATE', payload: walkThrough })
      }
 
    } catch (error) {
      appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_LOADING', payload: false })
      appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_LOADING', payload: false })
    }
  }
 
  useEffect(() => {
    fetch();
  }, [])
 
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };
 
  const handleNextClick = () => {
    navigate("/feedback");
  };
 
  const shipIconStyles: IIconProps = {
    iconName: 'VehicleBoat',
    styles: {
        root: {
            '@media (max-width: 600px)': {
                fontWeight: "bold", fontSize: "14px",
            },
            '@media (max-width: 1000px) and (min-width: 600px)': {
                fontWeight: "bold", fontSize: "28px",
            },
            '@media (max-width: 1500px) and (min-width: 1000px)': {
                fontWeight: "bold", fontSize: "28px",
                marginBottom:20
            },
            '@media (max-width: 2500px) and (min-width: 1500px)': {
                fontSize:"30px",
 
            },
            color: '#FFFFFF',
            cursor: 'pointer',
        },
    },
};
 
  const iconStyles: IIconProps = {
    iconName: 'Library',
    styles: {
        root: {
            '@media (max-width: 600px)': {
                fontWeight: "bold", fontSize: "14px",
            },
            '@media (max-width: 1000px) and (min-width: 600px)': {
                fontWeight: "bold", fontSize: "28px",
            },
            '@media (max-width: 1500px) and (min-width: 1000px)': {
                fontWeight: "bold", fontSize: "28px",
                // marginBottom:20
            },
            '@media (max-width: 2500px) and (min-width: 1500px)': {
                fontSize:"30px",
 
            },
            color: '#FFFFFF',
            cursor: 'pointer',
        },
    },
};
 
  return (
    <div className={styles.chatContainer}>
      <Stack horizontalAlign="center"
        styles={{
          root: {
            height: '100vh', marginTop: 24,
            '@media (max-width: 1000px)': {
              width: "100%",
            },
            '@media (max-width: 1500px) and (min-width: 1000px)': {
              width: "80%",
              marginTop: "80px"
            },
            '@media (max-width: 2500px) and (min-width: 1500px)': {
              width: "50%",
            },
          }
        }}>
        <div style={{ display: "flex", width: "100%", padding: "0px",alignItems:"center",marginBottom:"20px" }}>
          <BackButton onClick={() => navigate("/recommendations")}></BackButton>
          <Text
            styles={{
              root: {
                '@media (max-width: 600px)': {
                  fontWeight: "bold", fontSize: "14px", lineHeight: "20px", fontStyle: "normal",
                },
                '@media (max-width: 2500px) and (min-width: 600px)': {
                  fontWeight: "bold", fontSize: "32px", lineHeight: "30px", fontStyle: "normal", marginBottom: 20
                },
              }
            }}
            style={{ color: "white", display: "flex", alignItems: "center" }} >Details</Text>
        </div>
        <Stack horizontal tokens={{ childrenGap: 10 }} style={{ width: "100%", padding: "0px" }}
          styles={{
            root: {
              marginTop:10,
              '@media (max-width: 1000px)': {
                marginTop:20,
                height: "8%"
              },
              '@media (max-width: 2500px) and (min-width: 1000px)': {
                // height: "12%"
               
              },
            }
          }}
        >
          <PrimaryButton
            onClick={() => handleOptionClick('FlashCard')}
            styles={{
              root: {
                width: "50%",
                '@media (max-width: 600px)': {
                  height: "40px",
                },
                '@media (max-width: 2500px) and (min-width: 600px)': {
                  height: "80px",
                },
                background: "transparent",
                borderRadius: 10,
                boxShadow: 'none',
                border: `1px solid ${selectedOption === 'FlashCard' ? 'black !important' : 'transparent'}`,
                selectors: {
                  ':hover': {
                    background: "transparent !important",
                  },
                  ':active': {
                    background: "transparent",
                  },
                  ':focus': {
                    background: "transparent",
                  },
                },
              }
            }}
          >
            <Icon {...iconStyles} />
            <Text
              styles={{
                root: {
                  '@media (max-width: 600px)': {
                    fontSize: "14px", fontWeight: "600"
                  },
                  '@media (max-width: 2500px) and (min-width: 600px)': {
                    fontSize: "28px", fontWeight: "600"
                  },
                }
              }}
              style={{ color: selectedOption === "FlashCard" ? "#FFF" : '#9A9A90', marginLeft: 10, lineHeight: "20px", fontStyle: "normal" }}
            >{"Value Props"}</Text>
          </PrimaryButton>
          <PrimaryButton
            onClick={() => handleOptionClick('WalkAround')}
            styles={{
              root: {
                '@media (max-width: 600px)': {
                  height: "40px",
                },
                '@media (max-width: 2500px) and (min-width: 600px)': {
                  height: "80px",
                  ':hover': {
                    background: "transparent !important",
                  },
                },
                width: "50%",
                background: "transparent",
                borderRadius: 5,
                border: `1px solid ${selectedOption === 'WalkAround' ? 'black !important' : 'transparent'}`,
                color: '#FFFFFF',
                boxShadow: 'none',
                selectors: {
                  ':hover': {
                    background: "transparent !important",
                  },
                  ':active': {
                    background: "transparent",
 
                  },
                  ':focus': {
                    background: "transparent",
                  },
                },
              }
            }}
          >
            {renderBoatIcon()}
            <Text
              styles={{
                root: {
                  '@media (max-width: 600px)': {
                    fontSize: "14px", fontWeight: "600"
                  },
                  '@media (max-width: 2500px) and (min-width: 600px)': {
                    fontSize: "28px", fontWeight: "600"
                  },
                }
              }}
              style={{ color: selectedOption === "WalkAround" ? "#FFF" : '#9A9A90', marginLeft: 10 }} >{"Walk Around"}</Text>
          </PrimaryButton>
        </Stack>
        <Stack
          style={{ height:selectedOption==="WalkAround" ? "70%":"" ,width: "100%", display: "flex", flexDirection: "column", flexWrap: "wrap", flexFlow: "column", overflow: "hidden", alignItems: "center",justifyContent:selectedOption === 'WalkAround' ?"center":"flex-start", padding: selectedOption === 'WalkAround' ? "0px" : "0px" }}
          tokens={{ childrenGap: 10 }}
          styles={{root:{
            '@media (max-width: 2500px) and (min-width: 1000px)': {
              // marginTop:10
              marginTop: "40px"
            },
          }}}
        >
          {selectedOption === 'WalkAround' ? <WalkAround /> : <FlashCard />}
        </Stack>
        <Stack
          tokens={{ childrenGap: 20 }}
          horizontalAlign='center'
          style={{ height: "12%", position: "fixed", zIndex: 99999, bottom: 0, background: "transparent" }}
          styles={{
            root: {
              flexWrap: "wrap",
              '@media (max-width: 600px)': {
                width: "100%",
              },
              '@media (max-width: 1000px) and (min-width: 600px)': {
                width: "60%",
              },
              '@media (max-width: 1500px) and (min-width: 1000px)': {
                width: "80%",
              },
              '@media (max-width: 2500px) and (min-width: 1500px)': {
                width: "40%",
              },
            }
          }}
        >
          <PrimaryButton styles={{
            root: {
              fontSize: "0.875rem",
              '@media (max-width: 600px)': {
                height: "50px",
              },
              '@media (max-width: 2500px) and (min-width: 600px)': {
                height: "80px",
                marginTop: 15
              },
            },
            label: {
              '@media (max-width: 2500px) and (min-width: 600px)': {
                fontSize: "24px",
              },
            }
          }} style={{ width: "100%", borderRadius: 10, padding: 20, background: "black", border: "none" }} onClick={handleNextClick}>Done</PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};
 
export default ProductInformation;