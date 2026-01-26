import React, { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Card, CardContent, CardMedia, Typography, LinearProgress } from '@mui/material';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks'; 
import { Hero } from '../types/hero';
import { getCharacters } from '../api/characters'; 



interface HeroDetailProps {
  heroes: Hero[];
}

const HeroDetail: React.FC<HeroDetailProps> = ({ heroes }) => {
  const { id } = useParams<{ id: string }>();
  const hero = heroes.find((h) => h.id === Number(id));

  if (!hero) return <Typography sx={{ mt: 2 }}>Героя не знайдено на цій сторінці...</Typography>;

  return (
    <Card sx={{ mt: 2, border: '1px solid #ccc' }}>
      <CardMedia component="img" height="300" image={hero.image} alt={hero.name} />
      <CardContent>
        <Typography variant="h5">{hero.name}</Typography>
        <Typography color="text.secondary">Status: {hero.status}</Typography>
        <Typography color="text.secondary">Species: {hero.species}</Typography>
        <Typography color="text.secondary">Gender: {hero.gender}</Typography>
      </CardContent>
    </Card>
  );
};


const CustomLinearProgress = () => {
  return <LinearProgress />;
};



const Heroes: React.FC = () => {
  const navigate = useNavigate();

  
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  
  const { data, loading } = useRequest(
    
    () => getCharacters(paginationModel.page + 1), 
    {
      
      refreshDeps: [paginationModel.page], 
      debounceWait: 300, 
    }
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const handleRowClick = (params: any) => {
    navigate(`/heroes/${params.id}`);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '80vh', width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          
          rows={data?.results || []}
          columns={columns}
          loading={loading} 
          
          
          rowCount={data?.info.count || 0} 
          
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          
          pageSizeOptions={[20]}
          
          onRowClick={handleRowClick}
          slots={{ loadingOverlay: CustomLinearProgress }}
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
              backgroundColor: 'action.hover',
            },
          }}
        />
      </Box>

      <Box sx={{ width: '300px', flexShrink: 0 }}>
        <Routes>
          <Route path=":id" element={<HeroDetail heroes={data?.results || []} />} />
          <Route path="/" element={<Typography sx={{ mt: 2 }}>Оберіть персонажа</Typography>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Heroes;