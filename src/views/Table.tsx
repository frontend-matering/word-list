import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { WORDLIST } from "../data/words";
import { Wrapper } from "./Table.style";
import { Button, TextField } from "@mui/material";
import { useWordList } from "../hooks/useWordList";
import LaunchIcon from "@mui/icons-material/Launch";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "word", headerName: "Word", flex: 1 },
  { field: "phoneme", headerName: "Phoneme", width: 200, flex: 1 },
  { field: "meaning", headerName: "Meaning", width: 400, flex: 1 },
  {
    field: "learned",
    headerName: "learned",
    width: 400,
    flex: 1,
    renderCell: (params: GridRenderCellParams<{ value: string }, string>) => {
      if (params.value) {
        return <CheckCircleIcon className="success-icon" />;
      }
      return <InfoIcon className="info-icon" />;
    },
  },
  {
    field: "flagged",
    headerName: "flagged",
    width: 400,
    flex: 1,
    renderCell: (params: GridRenderCellParams<{ value: string }, string>) => {
      if (params.value) {
        return <FlagIcon className="flag-icon" />;
      }
      return null;
    },
  },
  {
    field: "resource",
    headerName: "resource",
    width: 400,
    flex: 1,
    renderCell: (params: GridRenderCellParams<{ value: string }, string>) => (
      <strong>
        <a
          href={`https://dictionary.cambridge.org/us/dictionary/english/${params.value}`}
          target="_blank"
          rel="noreferrer"
        >
          <LaunchIcon />
        </a>
      </strong>
    ),
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: `wordlist-${new Date().toISOString()}.csv`,
        }}
      />
    </GridToolbarContainer>
  );
}

export const TableWords = () => {
  const {
    data,
    filterData,
    markAsLearned,
    markAsFlagged,
    randomize,
    findWord,
  } = useWordList(WORDLIST);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Wrapper>
      <div className="filters">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          onChange={findWord}
        />
        <Button
          variant="contained"
          onClick={() => markAsLearned(rowSelectionModel, true)}
        >
          Mark as Learned
        </Button>
        <Button
          variant="contained"
          onClick={() => markAsFlagged(rowSelectionModel)}
        >
          Toogle as Flag
        </Button>
        <Button
          variant="contained"
          onClick={() => markAsLearned(rowSelectionModel, false)}
        >
          Mark as not learned
        </Button>
        <Button variant="contained" onClick={randomize}>
          Randomize
        </Button>
      </div>
      <div className="stats">
        <p>Total words: {data.length}</p>
        <p>Learned words: {data.filter((word) => word.learned).length}</p>
        <p>Flagged words: {data.filter((word) => word.flagged).length}</p>
      </div>
      <div className="data">
        <DataGrid
          style={{ width: "100%" }}
          rows={filterData?.length ? filterData : data}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </div>
    </Wrapper>
  );
};
