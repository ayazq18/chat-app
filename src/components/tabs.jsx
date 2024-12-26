import { Card, Tab, Tabs, tabsClasses } from '@mui/material';
import React, { useCallback, useState } from 'react';
import SvgColor from '../reUsabel/svg-color/svg-color';
import { useNavigate, useParams } from 'react-router-dom';

const icon = (name) => <SvgColor src={`/assets/images/${name}.svg`} />;

export const ACTIVITYTABS = [
    {
        value: 'chat',
        title: 'Chat',
        icon: icon('chat'),
    },
    {
        value: 'status',
        title: 'Status',
        icon: icon('status'),
    },
    {
        value: 'channels',
        title: 'Channels',
        icon: icon('channels'),
    },
    {
        value: 'communities',
        title: 'Communities',
        icon: icon('communities'),
    },
];

function ActivityTabs({ onTabChange, theme, sx }) {

    const navigate = useNavigate()
    const params = useParams()

    const [currentTab, setCurrentTab] = useState(() => {
        const localData = localStorage.getItem('activityTabs');
        if (localData) return localData;

        return 'chat';
    });

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
        navigate(`/tab/${newValue}`);
        localStorage.setItem('activityTabs', newValue);
        onTabChange(newValue);
    }, [onTabChange]);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                borderRight: 1,
                borderColor: 'divider',
                p: 2,
                borderRadius:'0',
                ...sx
            }}
        >
            <Tabs
                orientation="vertical"
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                    flexGrow: 1, // Make tabs fill available space
                    '& .MuiTabs-flexContainer': {
                        flexDirection: 'column',
                        justifyContent: 'center',

                    },
                    [`& .${tabsClasses.flexContainer}`]: {
                        justifyContent: 'center',
                    },
                    '& .MuiTab-root': {
                        justifyContent: 'center',
                        textAlign: 'left',
                    },
                }}
            >
                {ACTIVITYTABS.map((tab) => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        icon={tab.icon}
                        title={tab.title}
                        sx={{
                            mt: 1,
                            '&.Mui-selected': {
                                bgcolor: '#fbddb0',
                                borderTop: '2px solid black',
                                borderBottom: '2px solid black',
                            },
                            '&.Mui-selected .MuiTab-iconWrapper': {
                                bgcolor: 'primary.main',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTop: '2px solid black',
                                borderBottom: '2px solid black',
                                // borderRadius: '100%'
                            },
                        }}
                    />
                ))}
            </Tabs>
        </Card>
    );
}

export default ActivityTabs;
