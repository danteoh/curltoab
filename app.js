import React from 'react';
import { render} from 'react-dom';

const Converter = React.createClass({
  getInitialState() {
    return {
      iterations: 10,
      concurrency: 1,
      curl: '',
      abstring: '',
      url: null,
      cookie: null
    }
  },

  updateIterations(evt) {
    this.setState({
      iterations: evt.target.value
    }, this.updateOutput);
  },

  updateConcurrency(evt) {
    this.setState({
      concurrency: evt.target.value
    }, this.updateOutput);
  },

  updateCurlString(evt) {
    this.setState({
      curl: evt.target.value
    }, this.updateOutput);
  },

  updateOutput() {
    const {
      iterations, concurrency, curl
    } = this.state;

    if (curl && curl.indexOf('curl') === 0) {
      const curlComponents = curl.split(' ');
      const url = curlComponents[1];
      const baseString = `ab -n ${iterations} -c ${concurrency}`;
      let cookie = '';

      if (curl.indexOf('Cookie')) {
        const cookieString = curl.match(/-H 'Cookie: (.*?)(?:'|$)/)[1];
        cookie = `-C "${cookieString}"`;
      }

      const finalString = `${baseString} ${cookie} ${url}`;
      this.setState({
        abstring: finalString
      });
    }
  },

  render() {
    const {
      iterations, concurrency, url, curl, cookie, abstring
    } = this.state;

    return <div id='Converter'>
      <div className='params'>
        <label for='iterations'>AB Iterations</label>
        <input name='iterations' type='number' placeholder='Iterations' value={iterations} onChange={this.updateIterations}/>
        <label for='iterations'>AB Concurrency</label>
        <input type='number' placeholder='Concurrency' value={concurrency} onChange={this.updateConcurrency}/>
      </div>
      <div className='inputs'>
        <div className='paste-area'>
          <textarea onChange={this.updateCurlString} value={curl} />
        </div>

        <div className='result-area'>
          <textarea value={abstring} />
        </div>
      </div>
    </div>
  }
});

render(<Converter />, document.getElementById('react'));