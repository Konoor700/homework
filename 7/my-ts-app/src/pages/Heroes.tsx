import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, LinearProgress } from '@mui/material';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { Hero, ApiResponse } from '../types/hero';



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
  const [rows, setRows] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rowCount, setRowCount] = useState<number>(0);
  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  useEffect(() => {
    setLoading(true);
    
    axios.get<ApiResponse>(`https://rickandmortyapi.com/api/character/?page=${paginationModel.page + 1}`)
      .then((response) => {
        setRows(response.data.results);
        setRowCount(response.data.info.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [paginationModel.page]);

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
          rows={rows}
          columns={columns}
          loading={loading}
          
          rowCount={rowCount}
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
          <Route path=":id" element={<HeroDetail heroes={rows} />} />
          <Route path="/" element={<Typography sx={{ mt: 2 }}>Оберіть персонажа</Typography>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Heroes;