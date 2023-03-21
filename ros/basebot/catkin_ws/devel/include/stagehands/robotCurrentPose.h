// Generated by gencpp from file stagehands/robotCurrentPose.msg
// DO NOT EDIT!


#ifndef STAGEHANDS_MESSAGE_ROBOTCURRENTPOSE_H
#define STAGEHANDS_MESSAGE_ROBOTCURRENTPOSE_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace stagehands
{
template <class ContainerAllocator>
struct robotCurrentPose_
{
  typedef robotCurrentPose_<ContainerAllocator> Type;

  robotCurrentPose_()
    : robot_id()
    , xPos(0.0)
    , yPos(0.0)
    , rotationQuaternion()  {
    }
  robotCurrentPose_(const ContainerAllocator& _alloc)
    : robot_id(_alloc)
    , xPos(0.0)
    , yPos(0.0)
    , rotationQuaternion(_alloc)  {
  (void)_alloc;
    }



   typedef std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other >  _robot_id_type;
  _robot_id_type robot_id;

   typedef double _xPos_type;
  _xPos_type xPos;

   typedef double _yPos_type;
  _yPos_type yPos;

   typedef std::vector<double, typename ContainerAllocator::template rebind<double>::other >  _rotationQuaternion_type;
  _rotationQuaternion_type rotationQuaternion;





  typedef boost::shared_ptr< ::stagehands::robotCurrentPose_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::stagehands::robotCurrentPose_<ContainerAllocator> const> ConstPtr;

}; // struct robotCurrentPose_

typedef ::stagehands::robotCurrentPose_<std::allocator<void> > robotCurrentPose;

typedef boost::shared_ptr< ::stagehands::robotCurrentPose > robotCurrentPosePtr;
typedef boost::shared_ptr< ::stagehands::robotCurrentPose const> robotCurrentPoseConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::stagehands::robotCurrentPose_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::stagehands::robotCurrentPose_<ContainerAllocator> >::stream(s, "", v);
return s;
}


template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator==(const ::stagehands::robotCurrentPose_<ContainerAllocator1> & lhs, const ::stagehands::robotCurrentPose_<ContainerAllocator2> & rhs)
{
  return lhs.robot_id == rhs.robot_id &&
    lhs.xPos == rhs.xPos &&
    lhs.yPos == rhs.yPos &&
    lhs.rotationQuaternion == rhs.rotationQuaternion;
}

template<typename ContainerAllocator1, typename ContainerAllocator2>
bool operator!=(const ::stagehands::robotCurrentPose_<ContainerAllocator1> & lhs, const ::stagehands::robotCurrentPose_<ContainerAllocator2> & rhs)
{
  return !(lhs == rhs);
}


} // namespace stagehands

namespace ros
{
namespace message_traits
{





template <class ContainerAllocator>
struct IsMessage< ::stagehands::robotCurrentPose_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::stagehands::robotCurrentPose_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::robotCurrentPose_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::stagehands::robotCurrentPose_<ContainerAllocator> const>
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::robotCurrentPose_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::stagehands::robotCurrentPose_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::stagehands::robotCurrentPose_<ContainerAllocator> >
{
  static const char* value()
  {
    return "d025d245ac73544fde77dab78b28adba";
  }

  static const char* value(const ::stagehands::robotCurrentPose_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xd025d245ac73544fULL;
  static const uint64_t static_value2 = 0xde77dab78b28adbaULL;
};

template<class ContainerAllocator>
struct DataType< ::stagehands::robotCurrentPose_<ContainerAllocator> >
{
  static const char* value()
  {
    return "stagehands/robotCurrentPose";
  }

  static const char* value(const ::stagehands::robotCurrentPose_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::stagehands::robotCurrentPose_<ContainerAllocator> >
{
  static const char* value()
  {
    return "string robot_id\n"
"float64 xPos\n"
"float64 yPos\n"
"float64[] rotationQuaternion\n"
;
  }

  static const char* value(const ::stagehands::robotCurrentPose_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::stagehands::robotCurrentPose_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.robot_id);
      stream.next(m.xPos);
      stream.next(m.yPos);
      stream.next(m.rotationQuaternion);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct robotCurrentPose_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::stagehands::robotCurrentPose_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::stagehands::robotCurrentPose_<ContainerAllocator>& v)
  {
    s << indent << "robot_id: ";
    Printer<std::basic_string<char, std::char_traits<char>, typename ContainerAllocator::template rebind<char>::other > >::stream(s, indent + "  ", v.robot_id);
    s << indent << "xPos: ";
    Printer<double>::stream(s, indent + "  ", v.xPos);
    s << indent << "yPos: ";
    Printer<double>::stream(s, indent + "  ", v.yPos);
    s << indent << "rotationQuaternion[]" << std::endl;
    for (size_t i = 0; i < v.rotationQuaternion.size(); ++i)
    {
      s << indent << "  rotationQuaternion[" << i << "]: ";
      Printer<double>::stream(s, indent + "  ", v.rotationQuaternion[i]);
    }
  }
};

} // namespace message_operations
} // namespace ros

#endif // STAGEHANDS_MESSAGE_ROBOTCURRENTPOSE_H