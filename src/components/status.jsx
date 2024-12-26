import { Box, Button, Card, Drawer, Icon, IconButton, InputAdornment, CardMedia, CardContent, List, ListItem, ListItemText, TextField, Typography, Tabs, tabsClasses, Tab } from '@mui/material'
import React, { useCallback, useState } from 'react'
import EmptyContent from '../reUsabel/empty-content';

function Status() {

    return (
        <Box sx={{ width: '23vw'}}>
            <EmptyContent 
            title='Coming Soon!'
            description="There are no Status available at the moment."
            />
        </Box>
    )
}

export default Status;
