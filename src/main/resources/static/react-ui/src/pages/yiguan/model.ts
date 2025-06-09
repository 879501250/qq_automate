import { Diary, Mood } from './common/data';
import React, { useState, useRef, useCallback } from 'react';
import { useModel } from 'umi';

export default function Page() {
    const [list, setList] = useState<Diary[]>([]);
    const [suserMap, setSUserMap] = useState<Map<string, Diary[]>>(new Map());
    const [albumMap, setAlbumMap] = useState<Map<string, Diary[]>>(new Map());

    // let suserMap: Map<string, Diary[]> = new Map();
    const getSUserMap = () => suserMap;
    const updateSUserMap = useCallback((newMap: Map<string, Diary[]>) => setSUserMap(new Map(newMap)), []);
    // let albumMap: Map<string, Diary[]> = new Map();
    const getAlbumMap = () => albumMap;
    const updateAlbumMap = (newMap: Map<string, Diary[]>) => { setAlbumMap(new Map(newMap)) };

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
        getSUserMap, updateSUserMap,
        getAlbumMap, updateAlbumMap,
        lastScore,
        background, setBackground,
        initialQueryParams, setInitialQueryParams,
    };
};