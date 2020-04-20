import tape from 'tape-catch';
import MockAdapter from 'axios-mock-adapter';
import { testAuthWithPushDisabled, testAuthWith401, testNoEventSource } from '../nodeSuites/push-initialization-nopush.spec';
import { testAuthRetries, testSSERetries } from '../nodeSuites/push-initialization-retries.spec';
import { testSynchronization } from '../nodeSuites/push-synchronization.spec';
import { testSynchronizationRetries } from '../nodeSuites/push-synchronization-retries.spec';
import { testFallbacking } from '../nodeSuites/push-fallbacking.spec';
import { testRefreshToken } from '../nodeSuites/push-refresh-token.spec';

import { __getAxiosInstance } from '../../services/transport';

const mock = new MockAdapter(__getAxiosInstance());

tape('## Node JS - E2E CI Tests for PUSH ##', async function (assert) {

  assert.test('E2E / PUSH initialization: auth with push disabled', testAuthWithPushDisabled.bind(null, mock));
  assert.test('E2E / PUSH initialization: auth with 401', testAuthWith401.bind(null, mock));
  assert.test('E2E / PUSH initialization: fallback to polling if EventSource is not available', testNoEventSource.bind(null, mock));

  assert.test('E2E / PUSH initialization: auth failures and then success', testAuthRetries.bind(null, mock));
  assert.test('E2E / PUSH initialization: SSE connection failures and then success', testSSERetries.bind(null, mock));

  assert.test('E2E / PUSH synchronization: happy paths', testSynchronization.bind(null, mock));

  assert.test('E2E / PUSH synchronization: retries due to failures and corner cases', testSynchronizationRetries.bind(null, mock));

  assert.test('E2E / PUSH fallbacking', testFallbacking.bind(null, mock));

  assert.test('E2E / PUSH refresh token', testRefreshToken.bind(null, mock));

  assert.end();
});
