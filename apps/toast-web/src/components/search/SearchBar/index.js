// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Docked } from 'components/generic';
import Input from './Input';
import { Consumer, type SearchContext } from '../context';
import Suggestions from './Suggestions';
import TermSuggestion from './TermSuggestion';
import IngredientSuggestion from './IngredientSuggestion';
import Container from './Container';
import SectionTitle from './SectionTitle';

type State = {
  active: boolean,
};

export default class SearchBar extends React.PureComponent<*, State> {
  state = {
    active: false,
  };

  suggestionsRef = React.createRef();
  containerRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  handleDocumentClick = ev => {
    if (
      (!!this.suggestionsRef.current &&
        this.suggestionsRef.current.contains(ev.target)) ||
      (!!this.containerRef.current &&
        this.containerRef.current.contains(ev.target))
    ) {
      return;
    }

    this.setInactive();
  };

  setActive = () => this.setState({ active: true });
  setInactive = () => this.setState({ active: false });

  render() {
    return (
      <Consumer>
        {({ state, actions }: SearchContext) => (
          <Docked>
            {({ anchorRef, renderDocked }) => (
              <Container
                active={this.state.active}
                innerRef={this.containerRef}
              >
                <Input
                  innerRef={anchorRef}
                  name="searchInput"
                  value={state.inputValue}
                  onChange={actions.onInputChange}
                  onFocus={this.setActive}
                  active={this.state.active}
                  autoComplete="off"
                  placeholder="Search for recipes or ingredients..."
                />
                {this.state.active &&
                  (state.suggestions.length ||
                    (state.inputValue.length > 2 &&
                      renderDocked(
                        <Suggestions innerRef={this.suggestionsRef}>
                          <TermSuggestion
                            onClick={() => {
                              actions.setTerm(state.inputValue);
                              this.setInactive();
                            }}
                          >
                            Search for "{state.inputValue}" recipes
                          </TermSuggestion>
                          <SectionTitle>Include / Exclude:</SectionTitle>
                          {state.suggestions.ingredients.map(sug => (
                            <IngredientSuggestion
                              key={sug.ingredient.id}
                              suggestion={sug}
                              onSelected={this.setInactive}
                            />
                          ))}
                        </Suggestions>,
                      )))}
              </Container>
            )}
          </Docked>
        )}
      </Consumer>
    );
  }
}
