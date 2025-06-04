import { Diary, Mood } from './common/data';
import { useState, useRef } from 'react';
import { useModel } from 'umi';

export default function Page() {
    const [list, setList] = useState<Diary[]>([]);
    const [sUseList, setSUseList] = useState<Diary[]>([]);
    const [albumList, setAlbumList] = useState<Diary[]>([]);
    const lastScore = useRef(0);

    const [background, setBackground] = useState(true);

    const { initialState, loading } = useModel('@@initialState');
    const [initialQueryParams, setInitialQueryParams] = useState({
        ip: ['全部'],
        gender: ['2'],
        mood: '',
        age: ['05+', '00+', '95+', '90+', '85+', '80+', '80-'],
        socre: '',
    });
    if (!loading && initialQueryParams.mood == '') {
        const moods: Mood[] = initialState?.moods || [];
        setInitialQueryParams({
            ...initialQueryParams,
            mood: moods
                .filter((mood: Mood) => mood.name == '此刻')
                .map((mood: Mood) => mood.id)[0],
        });
    }

    return {
        list, setList,
        sUseList, setSUseList,
        albumList, setAlbumList,
        lastScore,
        background, setBackground,
        initialQueryParams, setInitialQueryParams,
    };
};