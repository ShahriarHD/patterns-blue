import cx from 'classnames';
import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';

type BlurValue = 'none' | 'sm' | 'md' | 'lg' | 'xl';
const BlurValues: Array<BlurValue> = ['none', 'sm', 'md', 'lg', 'xl'];

type BlurEffect = {
    amount: BlurValue
}

type ContrastValue = '50' | '75' | '100' | '125' | '150' | '200';
const ContrastValues: Array<ContrastValue> = ['50', '75', '100', '125', '150', '200'];
type GrayscaleEffect = {
    isOn: boolean,
    contrast?: ContrastValue;
}

type ColorDistributionAnalysis = {
    [key: string]: number
}

type ImageInfo = {
    blur: BlurEffect,
    grayscale: GrayscaleEffect,
    colorDistribution: ColorDistributionAnalysis
}

type ImageInfoDictionary = {
    [imageId: string]: ImageInfo
}

interface PlaygroundContextShape {
    info: ImageInfoDictionary,
}


function usePlaygroundSideEffects(info: ImageInfoDictionary, selectedImageId: string) {
    useEffect(() => {
        Object.entries(info).forEach(([id, { blur, grayscale }]) => {
            const imageClassName = cx('filter', {
                "blur-none": blur.amount === 'none',
                "blur": blur.amount === 'sm',
                "blur-md": blur.amount === 'md',
                "blur-xl": blur.amount === 'lg',
                "blur-3xl": blur.amount === 'xl',
                "grayscale-0": grayscale.isOn === false,
                "grayscale": grayscale.isOn,
                "contrast-50": grayscale.isOn && grayscale.contrast === '50',
                "contrast-75": grayscale.isOn && grayscale.contrast === '75',
                "contrast-100": grayscale.isOn && grayscale.contrast === '100',
                "contrast-125": grayscale.isOn && grayscale.contrast === '125',
                "contrast-150": grayscale.isOn && grayscale.contrast === '150',
                "contrast-200": grayscale.isOn && grayscale.contrast === '200',
                "ring-4 ring-blue-500": selectedImageId === id
            });

            const imageElement = document.getElementById(id);
            imageElement?.setAttribute('class', imageClassName);
        });
    }, [info, selectedImageId]);
}


export default function Playground(props: PropsWithChildren<{}>) {
    const [imagesInfo, setImagesInfo] = useState<{ [key: string]: ImageInfo }>({});
    const [selectedImageId, setSelectedImageId] = useState('');

    const imageClickCallback = useCallback((id: string) => {
        setSelectedImageId(id);
    }, [setSelectedImageId])
    // find images and gives them Id
    useEffect(() => {
        const imageElements = document.getElementsByTagName('img');
        if (imageElements && imageElements.length > 0) {
            const imgInfoDictionary: ImageInfoDictionary = {}
            Array.from(imageElements).forEach((imgElement, index) => {
                const imageId = imgElement.getAttribute('id') || uuidV4();
                imgElement.setAttribute('id', imageId);
                imgElement.onclick = (event) => {
                    event.stopPropagation();
                    imageClickCallback(imageId)
                };
                imgInfoDictionary[imageId] = {
                    blur: {
                        amount: 'none'
                    },
                    grayscale: {
                        isOn: false,
                    },
                    colorDistribution: {
                    }
                }
            });
            document.addEventListener('click', () => imageClickCallback(''));
            setImagesInfo(imgInfoDictionary);
        }
    }, [setImagesInfo]);


    usePlaygroundSideEffects(imagesInfo, selectedImageId);
    const setBlurCallback = useCallback((amount: BlurValue) => {
        if (selectedImageId) {
            setImagesInfo({
                ...imagesInfo,
                [selectedImageId]: {
                    ...imagesInfo[selectedImageId],
                    blur: {
                        amount
                    },
                }
            });
        }
    }, [selectedImageId, setImagesInfo]);

    const setGrayscaleCallback = useCallback((grayscale: GrayscaleEffect) => {
        if (selectedImageId) {
            setImagesInfo({
                ...imagesInfo,
                [selectedImageId]: {
                    ...imagesInfo[selectedImageId],
                    grayscale,
                }
            });
        }
    }, [selectedImageId, setImagesInfo]);

    return (
        <>
            {props.children}
            <ToolTray
                currentImageInfo={imagesInfo[selectedImageId]}
                setBlurValue={setBlurCallback}
                setGrayscaleEffect={setGrayscaleCallback}
            />
        </>
    )
}

interface ToolTrayProps {
    currentImageInfo?: ImageInfo,
    setBlurValue(value: BlurValue): void,
    setGrayscaleEffect(value: GrayscaleEffect): void,
}

function ToolTray(props: ToolTrayProps) {

    const { currentImageInfo, setBlurValue, setGrayscaleEffect } = props;
    return (
        <aside className="w-full">
            <div className={cx("fixed flex flex-col gap-4", { 'opacity-50 pointer-events-none': !currentImageInfo })}>
                {!currentImageInfo && <div className='text-slate-800 font-display italic'>Select an image to play with</div>}
                {currentImageInfo && <div className='text-slate-800 font-display italic'>Play with</div>}
                <div>

                    <h6 className="text-lg font-display pb-2">Blur</h6>
                    <div className="w-full flex flex-row gap-4 items-center justify-around">
                        {
                            BlurValues.map((value, index) => {

                                const dotClassName = cx('bg-amber-500 border-4 border-yellow-500 w-4 h-4 rounded-full', {
                                    "blur-none": value === 'none',
                                    "blur-sm": value === 'sm',
                                    "blur": value === 'md',
                                    "blur-md": value === 'lg',
                                    "blur-lg": value === 'xl',
                                });

                                const squareClassName = cx('rounded-md p-2', {
                                    'bg-blue-300': value === currentImageInfo?.blur.amount,
                                    'bg-slate-300': value !== currentImageInfo?.blur.amount,
                                })

                                return (
                                    <div className={squareClassName} key={`blur-value-${index}`} onClick={(event) => {
                                        event.stopPropagation();
                                        event.nativeEvent.stopPropagation();
                                        event.nativeEvent.stopImmediatePropagation();
                                        setBlurValue(value)
                                    }}>
                                        <div className={dotClassName}></div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div>

                    <h6 className="text-lg font-display pb-2">Contrast</h6>
                    <div className="w-full flex flex-row gap-4 items-center justify-around">
                        <div className="w-8 h-8 rounded-md border border-white" onClick={(event) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            event.nativeEvent.stopImmediatePropagation();
                            setGrayscaleEffect({
                                isOn: false,
                            })
                        }} />
                        {
                            ContrastValues.map((value, index) => {

                                const dotClassName = cx('w-4 h-4 rounded-full', {
                                    "bg-gray-100": value === '50',
                                    "bg-gray-200": value === '75',
                                    "bg-gray-300": value === '100',
                                    "bg-gray-400": value === '125',
                                    "bg-gray-500": value === '150',
                                    "bg-gray-600": value === '200',
                                });

                                const squareClassName = cx('rounded-md p-2 bg-gray-50', {
                                    'ring-2 ring-amber-500': value === currentImageInfo?.grayscale.contrast,
                                });

                                return (
                                    <div className={squareClassName} key={`blur-value-${index}`} onClick={(event) => {
                                        event.stopPropagation();
                                        event.nativeEvent.stopPropagation();
                                        event.nativeEvent.stopImmediatePropagation();
                                        setGrayscaleEffect({
                                            isOn: true,
                                            contrast: value
                                        })
                                    }}>
                                        <div className={dotClassName}></div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </aside>
    )
}