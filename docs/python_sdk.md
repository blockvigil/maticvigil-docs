---
id: python_sdk
title: Python SDK
sidebar_label: Python
---

## Prerequisite: Sign up for an MaticVigil developer account

To use the MaticVigil Python SDK, you need to be signed up for a beta developer account on https://mainnet.maticvigil.com

**You can choose any of the following approaches.**

### Sign up via the CLI tool `mv-cli` (Recommended )

Follow the instructions sequentially from these steps detailed in the links below.

* Install the CLI tool
	* [Recommended installation via downloadable binary](https://maticvigil.com/docs/cli_onboarding/#recommended-installation)
	* [Advanced installation via pip installer](https://maticvigil.com/docs/cli_onboarding/#advanced-installation-via-pip)

* [Generate a new MaticVigil invite code and complete signup on CLI](https://maticvigil.com/docs/cli_onboarding/#-generate-a-new-maticvigil-invite-code-and-complete-signup-on-cli)

This approach allows you to have control on your MaticVigil developer account from your command line itself without having to switch to the Web UI.

Once you have completed this section, head to [Quickstart](#quickstart).

### Sign up on the web UI

Once you have [signed up](https://maticvigil.com/docs/web_onboarding/) on the web UI
* you have to manually export your settings from the dashboard
![](assets/cli/exportsettings.png)
* To copy the downloaded file into `~/.maticvigil/settings.json` run the following commands in your terminal
```bash
cd ~
mkdir .maticvigil
# export key downloads a settings.json file into the Downloads directory
cp ~/Downloads/settings.json ~/.maticvigil/settings.json
```
>**Note:** The `~` in the above file path denotes your home directory on Linux/MacOS

## Quickstart

### Install  MaticVigil Python SDK

Choose any of the following approaches.

Either of them should install a python module `maticvigil`

1. #### `pip install` from Github repo

`pip install git+https://github.com/blockvigil/maticvigil-python-sdk.git`

2. #### Do a local `pip install` after `git clone`

```bash
git clone https://github.com/blockvigil/maticvigil-python-sdk.git
pip install maticvigil-python-sdk/
```

### Test import
Launch python in interactive mode and test if you can import the module. if you do not see any `ImportError` or other exceptions, you would want to move on to exploring the SDK further.

```
python
Python 3.6.5 (default, Jul 31 2019, 23:25:49)
[GCC 4.2.1 Compatible Apple LLVM 10.0.1 (clang-1001.0.46.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from maticvigil.EVCore import EVCore
>>>
```

### Initialize MaticVigil API instance
---

You can find the following usage examples in the [`examples/`](https://github.com/blockvigil/maticvigil-python-sdk/tree/master/examples) directory as well.

#### `EVCore`
```python
from maticvigil.EVCore import EVCore  
evc = EVCore(verbose=False)
```
If you configure the logging module appropriately, passing `verbose=True` to the above initialization will begin printing debug information on to the console.

Here is an example:

```
>>> import logging
>>> import sys
>>> stdout_handler = logging.StreamHandler(sys.stdout)
>>> stdout_handler.setLevel(logging.DEBUG)
>>> logging.getLogger('EVCore').level = logging.DEBUG
>>> logging.getLogger('EVCore').addHandler(stdout_handler)
>>> from maticvigil.EVCore import EVCore
>>> e = EVCore(verbose=True)
```

### Deploy a contract
Find the [`microblog.sol`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/microblog.sol) Solidity smart contract in the [`examples`](https://github.com/blockvigil/maticvigil-python-sdk/tree/master/examples) directory of the SDK github repo.

```python
from maticvigil.EVCore import EVCore  

evc = EVCore(verbose=False)  
r = evc.deploy(  
  contract_file='microblog.sol',  
  contract_name='Microblog',  
  inputs={  
  '_ownerName': 'anomit',  
  '_blogTitle': 'TheBlog'  
  }  
)
print(r['contract'])
```
The contract will be deployed at the address displayed above.

### Accessing previously deployed contracts
You can access operations on a contract previously deployed through MaticVigil by calling the `generate_contract_sdk()` function on the `EVCore` instance.
```python
from maticvigil.EVCore import EVCore

evc = EVCore(verbose=False)
# put in a contract address deployed from your MaticVigil account
contract_instance = evc.generate_contract_sdk(
    contract_address='0xContractAddress',
    app_name='microblog'
)
```

All the functions defined in the Solidity smart contract can be accessed by the same names against this contract instance. Read on to find out how.

### Reading from a contract
We will be using the contract instance from the above example.
```python
# calling the owner() function on the contract.
# This is a 'read' call, does not change state of the contract
print(contract_instance.blogTitle())
```
Example source code: [`examples/contract_read.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/contract_read.py)

### Writing to a contract
#### Changing the microblog title
```python
# calling the changeBlogTitle() function on the contract.
# This is a 'write' call, hence it changes state of the contract
# you can pass the arguments expected by the function as keyword parameters
# this sends out a transaction on the network
print(contract_instance.changeBlogTitle(_blogTitle='NewTitle'))
```

Example source code: [`examples/contract_write_changeBlogTitle.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/contract_write_changeBlogTitle.py)

#### Adding a new post
```python
# -- expanding keyword params from a mapping --
print(contract_instance.addPost(**{
	'title': 'New2',
	'body': 'Body2',
	'url': 'foo_url',
	'photo': 'http://imgurl/baz_photo'
}))
```

Example source code: [`examples/contract_write_addPost.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/contract_write_addPost.py)

Transactions that change the state of a smart contract take anywhere between 5-15 seconds to get confirmed on the blockchain.

This makes it necessary to build an asynchronous pattern for your blockchain applications. Let us take a look at it in the next section.

## Webhook integrations: Receive JSON payloads from events and other contract activity
---

MaticVigil does the hard work of monitoring your contracts, transactions on them and events that may be emitted by transactions triggering certain logic.

You can use these updates to enhance your blockchain applications and execute further logic "off-chain". Connect to multiple services like recording a new entry on Airtable, create a new Google Doc, executing IFTTT recipes; the possibilities are literally endless.

### Step 1: Set up a publicly available URL to which MaticVigil can push these updates.

For this example, we shall use [`ngrok`](https://ngrok.com/) to setup a publicly available URL in the format `https://<randomstring>.ngrok.com` . The tool receives HTTP payloads on this public URL and forwards them to a local HTTP server (running on your computer).

![ngrok HTTP tunneling](assets/py-sdk/ngrok.png)
_Image Credit: Ngrok.com_

> Technically this is known as HTTP tunnelling but let's not worry about semantics right now.

Follow the instructions on ngrok.com to install and setup the tool.

Then run it on the terminal with the following command.

`./ngrok http 8044`

![](assets/py-sdk/ngrok_terminal.png)

This will forward HTTP requests to a local server running on port `8044`. In the next step, we fire up this local server.

###  Step 2: Run the local HTTP server

We have included the code for this in [`examples/sample_webhook_listener.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/sample_webhook_listener.py). Open a new tab/window in your terminal and run it

`python sample_webhook_listener.py`

This starts a tornado server running on port 8044. The example code logs every received payload on the terminal.

### Step 3: Register the public `ngrok` URL with MaticVigil to receive updates

Example code: [`examples/webhook_integrations.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/webhook_integrations.py)

Copy the `https` URL against the Forwarding information from the running `ngrok` console. It will look something like this:

![](assets/py-sdk/ngrok_url.png)

```python
from maticvigil.EVCore import *  

evc = EVCore(verbose=False)  

# put in a contract address deployed from your MaticVigil account  
contract_instance = evc.generate_contract_sdk(  
  contract_address='0xContractAddress',  
  app_name='microblog'  
)  

# the URL to which event updates on the smart contract will be delivered by MaticVigil  
callback_url = 'https://f6192ec6.ngrok.io'  
# MaticVigil will watch over 'NewPost' event updates.
# Events to be monitored are specified as a list of event names  
print(contract_instance.add_event_integration(events=['NewPost'], callback_url=callback_url))
```

Continuing from the [`microblog.sol`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/microblog.sol) example, let us attempt to receive an update the `NewPost` event that is emitted when you call [ `addPost()` on the contract instance](#writing-to-a-contract).

### Step 4: Call `addPost()` and observe the local HTTP server

Apart from the terminal where `ngrok` is running, open up two more new terminal tabs or windows.

* Run the [`examples/sample_webhook_listener.py`](https://github.com/blockvigil/maticvigil-python-sdk/blob/master/examples/sample_webhook_listener.py) file
* In another one, run the following code snippet as demonstrated in the section **[Writing to a contract](#writing-to-a-contract)**

```python
from maticvigil.EVCore import EVCore

evc = EVCore(verbose=False)

# put in a contract address deployed from your MaticVigil account
contract_instance = evc.generate_contract_sdk(
    contract_address='0x6862aa9d817882e617206203c3442e625a202fce',
    app_name='microblog'
)

print(contract_instance.addPost(**{'title': 'NewPost1', 'body': 'This is just a string', 'url': 'not applicable', 'photo': 'not applicable'}))
```

This should generate a transaction to the contract. Shift to the terminal where `sample_webhook_listener.py` is running.

You should see the `NewPost` event being delivered to the script.

### GIF demonstrating the process of adding webhook integration

![MaticVigil Python SDK Webhook Integration](assets/py-sdk/EV-Python-SDK-Webhook-Integration.gif)
