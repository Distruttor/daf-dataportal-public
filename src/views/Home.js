import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail
} from '../actions'
import AutocompleteDataset from '../components/Autocomplete/AutocompleteDataset.js'

import UserStoryService from '../services/UserStoryService.js';
import UserStoriesContent from '../components/UserStory/UserStoriesContent.js';
import DatasetService from '../services/DatasetService.js';
import DatasetContent from '../components/Dataset/DatasetContent.js';
import SearchBar from '../components/HeaderFooter/SearchBar.js';

let userStoryService = new UserStoryService();
let datasetService = new DatasetService();

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {};

    //get stories
    let userStories = userStoryService.getLast();
    userStories.then((list) => {
      this.setState({
        userStories: list
      });
    });

    // get datast
    let dataset = datasetService.getLast();
    dataset.then((list) => {
      this.setState({
        dataset: list
      });
    });

    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
  }

  //Action creators don't dispatch anything to the store; 
  //instead they return action object that a 'central dispatch' uses (action.js) 
  handleLoadDatasetClick(e) {
    console.log('handleLoadDatasetClick');
    console.log('querystring: ' + this.refs.auto.state.value );
    var query = this.refs.auto.state.value;
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(query))
  }

  handleUnloadDatasetClick(e) {
    console.log('handleUnloadDatasetClick');
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(unloadDatasets())
  }

  handleLoadDatasetDetailClick(name, e){
    console.log('handleLoadDatasetDetailClick ' + name);
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(datasetDetail(name))
  }

    
    renderDatasetDetail(dataset, ope){
    console.log('ope: ' + ope)
    if(ope == 'RECEIVE_DATASET_DETAIL')
    if(dataset)
        return(
          <div className="u-background-white u-layout-r-withGutter u-posRelative u-zindex-30">
            <div className="u-layout-wide u-layoutCenter u-layout-withGutter u-padding-r-top u-padding-bottom-xxl">
              <div className="Grid Grid--withGutter">
                <div className="Grid-cell u-md-size8of12 u-lg-size8of12 u-padding-right-xl">
                  <h2 className=" u-padding-bottom-l">{dataset.resources[0].name}</h2>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <p><strong>Titolare del dataset: </strong> {dataset.author}</p>
                    <p><strong>Editore del dataset:</strong> {dataset.author}</p>
                    <p><strong>Autore del dataset:</strong> {dataset.author}</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Descrizione</h3>
                    <p>{dataset.resources[0].description }</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Risorse</h3>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-5 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">JSON</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata json</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da...<br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-10 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">CSV</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata csv</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da... <br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-20 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">ZIP</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata zip</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da...<br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="Grid-cell u-sizeFull u-md-size4of12 u-lg-size4of12">
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <p><strong>Licenza: </strong> Creative Commons Attribution 4.0 International (CC-BY 4.0)</p>
                    <p><strong>Temi del dataset:</strong> </p>
                    <p><strong>Parole chiave del dataset:</strong> <a href="#">assicurazioni</a> <a href="#">autoautomobile</a> <a href="#">autoveicoli</a> <a href="#">circolazione</a> <a href="#">mobilità</a> <a href="#">moto</a> <a href="#">motorizzazione</a> <a href="#">motoveicoli</a> <a href="#">parco circolante</a> <a href="#">revisioni</a> <a href="#">veicoli</a> <a href="#">vettura</a></p>
                    <p><strong>Data di rilascio:</strong> 2017-03-07</p>
                    <p><strong>Identificativo del dataset:</strong> 60a57c60-758c-4bd9-8d87-c286b797c289</p>
                    <p><strong>Data di ultima modifica: </strong> Lunedì 17 Luglio 2017</p>
                    <p><strong>Lingua del dataset: </strong> Italian</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Contatti</h3>
                    <p><strong>Email Contatto: </strong> <a href="#">mail@mail.it</a> </p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Catalogo</h3>
                    <p><strong>Home page: </strong> <a href="#">http://dati.mit.gov.it/catalog/dataset</a> </p>
                    <p><strong>URL API: </strong> <a href="#">http://dati.mit.gov.it/catalog/api/3/a...</a> </p>
                  </article>
                  <a href="#" title="torna all'inizio del contenuto" className="u-hiddenVisually">torna all'inizio del contenuto</a>
                </div>
              </div>
            </div>
          </div>
        );
  }

  render() {
    const { datasets, dataset, ope } = this.props
    return (
      <div>
          <div className="u-textCenter">
            <SearchBar />
            {this.renderDatasetDetail(dataset, ope)}

            <section className="u-nbfc u-background-white  u-textCenter u-layout-r-withGutter u-padding-r-top u-padding-r-bottom u-posRelative u-zindex-30">
              <div className="u-layout-wide u-layoutCenter">
                
                <UserStoriesContent userStories={this.state.userStories} >
                </UserStoriesContent>

                <DatasetContent dataset={this.state.dataset} >
                </DatasetContent>

              </div>
            </section>
          </div>
      </div>
    )
  }
}



Home.propTypes = {
  selectDataset: PropTypes.string,
  datasets: PropTypes.array,
  dataset: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  ope: PropTypes.string
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, dataset,  items: datasets, ope } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope:'' }
  return {datasets, dataset, isFetching, lastUpdated, ope}
}

export default connect(mapStateToProps)(Home)