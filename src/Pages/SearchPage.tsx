import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import {
  GridHeader,
  GridContainer,
  GridItem,
  GridLoader,
  InfiniteLoader,
  CustomModal,
  Showcase
} from "Components";
import { PhotoDataContext } from "context";
import { ALLOW_FETCHING, PAUSE_FETCHING } from "actions/infiniteLoaderActions";
import getProps from "utilities/getProps";
import { searchIcon } from "assets/svg";

const PageContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 936px;
  @media only screen and (max-width: 936px) {
    width: 100%;
  }
`;

const SearchTypeList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const SearchTypeLink = styled.div<{isSelected: boolean;}>`
  cursor: pointer;
  padding: 5px 15px;
  margin: 10px;
  position: relative;
  font-size: x-large;
  ${props =>
    props.isSelected &&
    `
        border-bottom:2px solid ${props.theme.textColor};
    `}

  &:hover {
    ${props =>
      props.isSelected &&
      `
        border-bottom:2px solid ${props.theme.textColor};
        `}
  }
`;


interface SearchHeaderProps{
  searchValue:string;
  searchType:string;
  total:number;
}

const SearchHeader = ({ 
  searchValue, 
  searchType, 
  total 
}:SearchHeaderProps) => {
  const title = `Search results for "${searchValue}"`;
  const statList = total !== null ? [`${total} ${searchType} found`] : [];
  return <GridHeader src={searchIcon} title={title} statList={statList} />;
};

interface Params{
  searchValue:string;
  searchType:string;
}

export default function SearchPage({ 
  history, 
  match:{ params, path }
}:RouteComponentProps<Params>) {
  const { searchValue, searchType } = params;
  const [state, dispatch] = useContext(PhotoDataContext);
  const { dataList: photoList } = state.searchPage.photos;
  const { dataList, total } = state.searchPage[searchType];

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(0);

  useEffect(() => {
    dispatch(ALLOW_FETCHING(path));
    return () => {
      dispatch(PAUSE_FETCHING);
    };
  }, [searchType]);

  useEffect(() => {
    dispatch(ALLOW_FETCHING(path));
    return () => {
      dispatch(PAUSE_FETCHING);
    };
  }, [searchValue]);

  const changeSearchType = (searchType:string) => {
    history.push(`/search/${searchType}/${searchValue}`);
  };

  const redirectToCollectionPage = (collection:any) => {
    history.push(`/collection/${collection.id}`);
  };

  const openShowcase = (index:number) => {
    setInitialSlide(index);
    setModalIsOpen(true);
  };

  return (
    <>
      <PageContainer>
        <SearchHeader
          searchValue={searchValue}
          searchType={searchType}
          total={total}
        />
        <SearchTypeList>
          <SearchTypeLink
            data-cy="search_button_photos"
            onClick={() => changeSearchType("photos")}
            isSelected={searchType === "photos"}
          >
            Photos
          </SearchTypeLink>
          <SearchTypeLink
            data-cy="search_button_collections"
            onClick={() => changeSearchType("collections")}
            isSelected={searchType === "collections"}
          >
            Collections
          </SearchTypeLink>
        </SearchTypeList>
        <InfiniteLoader
          route={path}
          query="search"
          searchType={searchType}
          searchValue={searchValue}
          loader={<GridLoader key="loading" />}
        >
          <GridContainer>
            {dataList.map((item:any, i:number) => {
              const props = getProps[searchType](item);
              const onClick =
                searchType === "photos"
                  ? () => openShowcase(i)
                  : () => redirectToCollectionPage(item);
              return <GridItem {...props} onClick={onClick} />;
            })}
          </GridContainer>
        </InfiniteLoader>
      </PageContainer>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <Showcase
          photoList={photoList}
          initialSlide={initialSlide}
          closeModal={() => setModalIsOpen(false)}
        />
      </CustomModal>
    </>
  );
}
