import instance from '@/lib/axios';
import icCheckColor from '@/public/images/icon/ic-check-color.svg';
import icDotBlue from '@/public/images/icon/ic-dot-blue.svg';
import icDotGreen from '@/public/images/icon/ic-dot-green.svg';
import icDotOrange from '@/public/images/icon/ic-dot-orange.svg';
import icDotPink from '@/public/images/icon/ic-dot-pink.svg';
import icDotPurple from '@/public/images/icon/ic-dot-purple.svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const DashboardNameEdit = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5OCwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgyMzk4LCJpc3MiOiJzcC10YXNraWZ5In0.duwqLvblOuUU7QTXyx1oKc0N14yhQL4qwvLUZcPG-zk'; // 로그인 후 받은 토큰
      try {
        const response = await instance.get(`dashboards/9765`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response.data);
        setTitle(response.data.title);
        setColor(getColorName(response.data.color));
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      alert('대시보드 이름을 입력해주세요');
      return;
    }

    //이름,컬러 수정정 요청
    const colorCode = getColorCode(color);
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5OCwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgyMzk4LCJpc3MiOiJzcC10YXNraWZ5In0.duwqLvblOuUU7QTXyx1oKc0N14yhQL4qwvLUZcPG-zk'; // 로그인 후 받은 토큰
    try {
      const response = await instance.put(
        'dashboards/9765',
        {
          title: inputTitle,
          color: colorCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Dashboard updated:', response.data);
      setTitle(inputTitle);
      alert('이름이 변경되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  };

  //선택한 컬러 코드 가져오기
  const getColorCode = (colorName: string): string => {
    switch (colorName) {
      case 'green':
        return '#7AC555';
      case 'purple':
        return '#760DDE';
      case 'orange':
        return '#FFA500';
      case 'pink':
        return '#E876EA';
      case 'blue':
        return '#76A5EA';
      default:
        return ''; // Handle default case or throw error
    }
  };

  
  const getColorName = (colorCode: string): string => {
    switch (colorCode) {
      case '#7AC555':
        return 'green';
      case '#760DDE':
        return 'purple';
      case '#FFA500':
        return 'orange';
      case '#E876EA':
        return 'pink';
      case '#76A5EA':
        return 'blue';
      default:
        return ''; // Handle default case or throw error
    }
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-20">
      <div className="flex h-[256px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="mb-30 flex items-center justify-between">
          <div className="text-xl font-bold">{title}</div>
          <div className="flex gap-10">
            {['green', 'purple', 'orange', 'blue', 'pink'].map(
              (colorOption) => (
                <button
                  key={colorOption}
                  onClick={() => handleColorChange(colorOption)}
                  className={`color-option relative ${color === colorOption ? 'selected' : ''}`}
                >
                  <Image
                    src={
                      colorOption === 'green'
                        ? icDotGreen
                        : colorOption === 'purple'
                          ? icDotPurple
                          : colorOption === 'orange'
                            ? icDotOrange
                            : colorOption === 'blue'
                              ? icDotBlue
                              : icDotPink
                    }
                    width={30}
                    height={30}
                    alt={colorOption}
                  />
                  {color === colorOption && (
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                      <Image
                        src={icCheckColor}
                        width={20}
                        height={20}
                        alt="체크"
                      />
                    </div>
                  )}
                </button>
              ),
            )}
          </div>
        </div>
        <p className="text-[1.125rem] font-medium">대시보드 이름</p>
        <input
          className="mt-8 h-48 w-full rounded-md border border-gray-300"
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
        />
        <div className="flex justify-end">
          <button
            className="mt-[28px] btn_small_purple"
            type="button"
            onClick={handleSubmit}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNameEdit;

//////////////////////
////////////////////
//////////////////////
