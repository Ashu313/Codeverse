import React from "react";
 
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCheck } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

 
const data = {
    Sheet1: [
        {
            "Topic:": "LinkedList",
            "Problem: ": "Write a Program to reverse the Linked List. (Both Iterative and recursive)",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/reverse-a-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Reverse a Linked List in group of Given Size. [Very Imp]",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Write a program to Detect loop in a linked list.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Write a program to Delete loop in a linked list.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/remove-loop-in-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Find the starting point of the loop. ",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/find-first-node-of-loop-in-a-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Remove Duplicates in a sorted Linked List.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Remove Duplicates in a Un-sorted Linked List.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/remove-duplicates-from-an-unsorted-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Write a Program to Move the last element to Front in a Linked List.",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/move-last-element-to-front-of-a-given-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Add “1” to a number represented as a Linked List.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Add two numbers represented by linked lists.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Intersection of two Sorted Linked List.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/intersection-of-two-sorted-linked-lists/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Intersection Point of two Linked Lists.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Merge Sort For Linked lists.[Very Important]",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/sort-a-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Quicksort for Linked Lists.[Very Important]",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/quick-sort-on-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Find the middle Element of a linked list.",
            "Done": "<->",
            "URL": "https://leetcode.com/problems/middle-of-the-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Check if a linked list is a circular linked list.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/circular-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Split a Circular linked list into two halves.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/split-a-circular-linked-list-into-two-halves/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Write a Program to check whether the Singly Linked list is a palindrome or not.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Deletion from a Circular Linked List.",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/deletion-circular-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Reverse a Doubly Linked list.",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Find pairs with a given sum in a DLL.",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/find-pairs-given-sum-doubly-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Count triplets in a sorted DLL whose sum is equal to given value “X”.",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/count-triplets-sorted-doubly-linked-list-whose-sum-equal-given-value-x/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Sort a “k”sorted Doubly Linked list.[Very IMP]",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/sort-k-sorted-doubly-linked-list/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Rotate DoublyLinked list by N nodes.",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/rotate-doubly-linked-list-n-nodes/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Rotate a Doubly Linked list in group of Given Size.[Very IMP]",
            "Done": "<->",
            "URL": "https://www.geeksforgeeks.org/reverse-doubly-linked-list-groups-given-size/"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Can we reverse a linked list in less than O(n) ?",
            "Done": "<->",
            "URL": "<->"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Why Quicksort is preferred for. Arrays and Merge Sort for LinkedLists ?",
            "Done": "<->",
            "URL": "<->"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Flatten a Linked List",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Sort a LL of 0's, 1's and 2's",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Clone a linked list with next and random pointer",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Merge K sorted Linked list",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Multiply 2 no. represented by LL",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/multiply-two-linked-lists/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Delete nodes which have a greater value on right side",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/delete-nodes-having-greater-value-on-right/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Segregate even and odd nodes in a Linked List",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list/0"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Program for n’th node from the end of a Linked List",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1"
        },
        {
            "Topic:": "LinkedList",
            "Problem: ": "Find the first non-repeating character from a stream of characters",
            "Done": "<->",
            "URL": "https://practice.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream/0"
        },
    ],
  };
  

export const LinkedList = () => {
  useEffect(() => {
    const active = window.localStorage.getItem("color-key");
    console.log("color-key");
    setActive(JSON.parse(active));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key", JSON.stringify(active));
  });

  useEffect(() => {
    const active1 = window.localStorage.getItem("color-key1");
    console.log("color-key1");
    setActive1(JSON.parse(active1));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key1", JSON.stringify(active1));
  });

  useEffect(() => {
    const active2 = window.localStorage.getItem("color-key2");
    console.log("color-key2");
    setActive2(JSON.parse(active2));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key2", JSON.stringify(active2));
  });

  useEffect(() => {
    const active3 = window.localStorage.getItem("color-key3");
    console.log("color-key3");
    setActive3(JSON.parse(active3));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key3", JSON.stringify(active3));
  });

  useEffect(() => {
    const active4 = window.localStorage.getItem("color-key4");
    console.log("color-key4");
    setActive4(JSON.parse(active4));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key4", JSON.stringify(active4));
  });

  useEffect(() => {
    const active5 = window.localStorage.getItem("color-key5");
    console.log("color-key5");
    setActive5(JSON.parse(active5));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key5", JSON.stringify(active5));
  });

  useEffect(() => {
    const active6 = window.localStorage.getItem("color-key6");
    console.log("color-key6");
    setActive6(JSON.parse(active6));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key6", JSON.stringify(active6));
  });

  useEffect(() => {
    const active7 = window.localStorage.getItem("color-key7");
    console.log("color-key7");
    setActive7(JSON.parse(active7));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key7", JSON.stringify(active7));
  });

  useEffect(() => {
    const active8 = window.localStorage.getItem("color-key8");
    console.log("color-key8");
    setActive8(JSON.parse(active8));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key8", JSON.stringify(active8));
  });

  useEffect(() => {
    const active9 = window.localStorage.getItem("color-key9");
    console.log("color-key9");
    setActive9(JSON.parse(active9));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key9", JSON.stringify(active9));
  });

  useEffect(() => {
    const active10 = window.localStorage.getItem("color-key10");
    console.log("color-key10");
    setActive10(JSON.parse(active10));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key10", JSON.stringify(active10));
  });

  useEffect(() => {
    const active11 = window.localStorage.getItem("color-key11");
    console.log("color-key11");
    setActive11(JSON.parse(active11));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key11", JSON.stringify(active11));
  });

  useEffect(() => {
    const active12 = window.localStorage.getItem("color-key12");
    console.log("color-key12");
    setActive12(JSON.parse(active12));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key12", JSON.stringify(active12));
  });

  useEffect(() => {
    const active13 = window.localStorage.getItem("color-key13");
    console.log("color-key13");
    setActive13(JSON.parse(active13));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key13", JSON.stringify(active13));
  });

  useEffect(() => {
    const active14 = window.localStorage.getItem("color-key14");
    console.log("color-key14");
    setActive14(JSON.parse(active14));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key14", JSON.stringify(active14));
  });

  useEffect(() => {
    const active15 = window.localStorage.getItem("color-key15");
    console.log("color-key15");
    setActive15(JSON.parse(active15));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key15", JSON.stringify(active15));
  });

  useEffect(() => {
    const active16 = window.localStorage.getItem("color-key16");
    console.log("color-key16");
    setActive16(JSON.parse(active16));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key16", JSON.stringify(active16));
  });

  useEffect(() => {
    const active17 = window.localStorage.getItem("color-key17");
    console.log("color-key17");
    setActive17(JSON.parse(active17));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key17", JSON.stringify(active17));
  });

  useEffect(() => {
    const active18 = window.localStorage.getItem("color-key18");
    console.log("color-key18");
    setActive18(JSON.parse(active18));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key18", JSON.stringify(active18));
  });

  useEffect(() => {
    const active19 = window.localStorage.getItem("color-key19");
    console.log("color-key19");
    setActive19(JSON.parse(active19));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key19", JSON.stringify(active19));
  });

  useEffect(() => {
    const active20 = window.localStorage.getItem("color-key20");
    console.log("color-key20");
    setActive20(JSON.parse(active20));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key20", JSON.stringify(active20));
  });

  useEffect(() => {
    const active21 = window.localStorage.getItem("color-key21");
    console.log("color-key21");
    setActive21(JSON.parse(active21));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("color-key21", JSON.stringify(active21));
  });

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
    alert("Question has been marked as done");
  };

  const [active1, setActive1] = useState(false);
  const handleClick1 = () => {
    setActive1(!active1);
    alert("Question has been marked as done");
  };

  const [active2, setActive2] = useState(false);
  const handleClick2 = () => {
    setActive2(!active2);
    alert("Question has been marked as done");
  };

  const [active3, setActive3] = useState(false);
  const handleClick3 = () => {
    setActive3(!active3);
    alert("Question has been marked as done");
  };

  const [active4, setActive4] = useState(false);
  const handleClick4 = () => {
    setActive4(!active4);
    alert("Question has been marked as done");
  };

  const [active5, setActive5] = useState(false);
  const handleClick5 = () => {
    setActive5(!active5);
    alert("Question has been marked as done");
  };

  const [active6, setActive6] = useState(false);
  const handleClick6 = () => {
    setActive6(!active6);
    alert("Question has been marked as done");
  };

  const [active7, setActive7] = useState(false);
  const handleClick7 = () => {
    setActive7(!active7);
    alert("Question has been marked as done");
  };

  const [active8, setActive8] = useState(false);
  const handleClick8 = () => {
    setActive8(!active8);
    alert("Question has been marked as done");
  };

  const [active9, setActive9] = useState(false);
  const handleClick9 = () => {
    setActive9(!active9);
    alert("Question has been marked as done");
  };

  const [active10, setActive10] = useState(false);
  const handleClick10 = () => {
    setActive10(!active10);
    alert("Question has been marked as done");
  };

  const [active11, setActive11] = useState(false);
  const handleClick11 = () => {
    setActive11(!active11);
    alert("Question has been marked as done");
  };

  const [active12, setActive12] = useState(false);
  const handleClick12 = () => {
    setActive12(!active12);
    alert("Question has been marked as done");
  };

  const [active13, setActive13] = useState(false);
  const handleClick13 = () => {
    setActive13(!active13);
    alert("Question has been marked as done");
  };

  const [active14, setActive14] = useState(false);
  const handleClick14 = () => {
    setActive14(!active14);
    alert("Question has been marked as done");
  };

  const [active15, setActive15] = useState(false);
  const handleClick15 = () => {
    setActive15(!active15);
    alert("Question has been marked as done");
  };

  const [active16, setActive16] = useState(false);
  const handleClick16 = () => {
    setActive16(!active16);
    alert("Question has been marked as done");
  };

  const [active17, setActive17] = useState(false);
  const handleClick17 = () => {
    setActive17(!active17);
    alert("Question has been marked as done");
  };

  const [active18, setActive18] = useState(false);
  const handleClick18 = () => {
    setActive18(!active18);
    alert("Question has been marked as done");
  };

  const [active19, setActive19] = useState(false);
  const handleClick19 = () => {
    setActive19(!active19);
    alert("Question has been marked as done");
  };

  const [active20, setActive20] = useState(false);
  const handleClick20 = () => {
    setActive20(!active20);
    alert("Question has been marked as done");
  };

  const [active21, setActive21] = useState(false);
  const handleClick21 = () => {
    setActive21(!active21);
    alert("Question has been marked as done");
  };

  // useEffect(() => {
  //     window.localStorage.setItem('save', JSON.stringify(isActive));
  // });

  // useEffect(() => {
  //     const savedData = window.localStorage.getItem("save");
  //     console.log(savedData);
  //     setIsActive(JSON.parse(savedData))

  // }, []);
 
    const [completed, setCompleted] = useState([]);
  
    const handleMarkComplete = (index) => {
      const newCompleted = [...completed];
      newCompleted[index] = !completed[index];
      setCompleted(newCompleted);
  
      // Show toast notification
      toast.success(`Question ${index + 1} has been marked as completed!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
  
    return (
      <div className="array-page bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="table-container p-6 bg-white rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300 w-1/12">ID</th>
                <th className="px-4 py-2 border border-gray-300">Questions</th>
                <th className="px-4 py-2 border border-gray-300">Links</th>
              </tr>
            </thead>
            <tbody>
              {data.Sheet1.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    completed[index] ? "bg-green-100" : "bg-white"
                  } border-b border-gray-300 hover:bg-gray-100`}
                >
                  <td
                    className="px-4 py-2 border border-gray-300 text-center cursor-pointer"
                    onClick={() => handleMarkComplete(index)}
                  >
                    {completed[index] ? (
                      <AiOutlineCheck className="text-green-500 text-2xl" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item["Problem: "]}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <a href={item.URL} target="_blank" rel="noreferrer">
                      <BsBoxArrowUpRight className="text-blue-500 text-xl" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export default LinkedList;
  